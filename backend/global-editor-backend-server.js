import express from 'express';
import { Server } from 'socket.io'; // Import Socket.IO Server
import http from 'http';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import * as Y from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness';

const yDocs = new Map();           // docId -> Y.Doc
const awarenessStates = new Map(); // docId -> Awareness

function getYDoc(docId) {
  let doc = yDocs.get(docId);
  if (!doc) {
    doc = new Y.Doc();
    yDocs.set(docId, doc);
  }
  return doc;
}

function getAwareness(docId, ydoc) {
  let awareness = awarenessStates.get(docId);
  if (!awareness) {
    awareness = new awarenessProtocol.Awareness(ydoc);
    awarenessStates.set(docId, awareness);
  }
  return awareness;
}

const app = express();
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  return next();
});
app.use(express.urlencoded({ extended: true, limit: '250mb' }));
app.use(express.json({ limit: '250mb' }));
const __dirname = path.resolve();
const uploadDirPath = `/var/www/html/app.timebox.ai/global-editor-backend/global_editor_data`;

const clients = {};
const port = 7000;
const host = 'localhost';

// Initialize the HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  path: '/global-editor-api/socket.io', // Ensure this path matches the client-side
  transports: ['websocket'], // WebSocket only
  cors: {
    origin: '*', // Set appropriate CORS settings
    methods: ['GET', 'POST'],
  }
});

const globalEditorNamespace = io.of('/global-editor-api');

// Function to get a unique client ID
function getUniqueID() {
  return "client_" + Math.random().toString(36).substr(2, 9);
}

// Setup Socket.IO connection and event listeners
globalEditorNamespace.on('connection', (socket) => {
  const userID = getUniqueID();
  clients[userID] = socket;

  // Keep track of which docs this socket has joined (for awareness cleanup)
  const joinedYDocs = new Set();

  // --- Existing joinRoom + message handling (leave as is) ---
  socket.on("joinRoom", (mainEditorDocumentId) => {
    console.log(`Client ${userID} joining room: ${mainEditorDocumentId}`);
    socket.join(mainEditorDocumentId);
  });

  socket.on('message', (binaryMessage) => {
    try {
      const jsonString = binaryMessage.toString();
      const jsonData = JSON.parse(jsonString);
      const { mainEditorDocumentId } = jsonData;

      socket.to(mainEditorDocumentId).emit('message', binaryMessage);
    } catch (error) {
      console.error('Error parsing binary message:', error);
    }
  });

  // when a collab client joins a Yjs doc room
  // Client joins a Yjs document
  socket.on('joinYDoc', (docId) => {
    console.log(`Client ${userID} joining YDoc: ${docId}`);
    socket.join(docId);
    joinedYDocs.add(docId);

    const ydoc = getYDoc(docId);

    // Send the FULL current state of the Y.Doc to this client
    try {
      const update = Y.encodeStateAsUpdate(ydoc);
      socket.emit('yjs-update', { docId, update });
    } catch (e) {
      console.error('Error encoding Yjs state for joinYDoc', e);
    }
  });

  // Receive Yjs document updates from a client
  socket.on('yjs-update', ({ docId, update }) => {
    if (!docId || !update) return;

    const ydoc = getYDoc(docId);

    // Normalize update to Uint8Array
    const u =
        update instanceof Uint8Array
            ? update
            : update instanceof ArrayBuffer
                ? new Uint8Array(update)
                : (update.byteLength !== undefined ? new Uint8Array(update) : update);

    try {
      // Apply to server Y.Doc
      Y.applyUpdate(ydoc, u);
    } catch (e) {
      console.error('Error applying Yjs update on server', e);
    }

    // Relay to all other clients editing this doc
    socket.to(docId).emit('yjs-update', { docId, update });
  });

  // --- NEW: awareness (cursor colors, user presence) ---
  socket.on('yjs-awareness', ({ docId, update }) => {
    if (!docId || !update) return;

    const ydoc = getYDoc(docId);
    const awareness = getAwareness(docId, ydoc);

    const u =
        update instanceof Uint8Array
            ? update
            : update instanceof ArrayBuffer
                ? new Uint8Array(update)
                : (update.byteLength !== undefined ? new Uint8Array(update) : update);

    try {
      // Update server awareness; use socket.id as "origin"
      awarenessProtocol.applyAwarenessUpdate(awareness, u, socket.id);
    } catch (e) {
      console.error('Error applying awareness update on server', e);
    }

    // Broadcast to others so they see the remote cursors
    socket.to(docId).emit('yjs-awareness', { docId, update });
  });

  // --- Disconnect cleanup ---
  socket.on("disconnect", () => {
    // Optional: clean up awareness so cursors disappear when a client leaves
    joinedYDocs.forEach((docId) => {
      const awareness = awarenessStates.get(docId);
      if (awareness) {
        try {
          awareness.removeStates([socket.id], 'disconnect');
          // Broadcast removed awareness
          const update = awarenessProtocol.encodeAwarenessUpdate(awareness, [socket.id]);
          socket.to(docId).emit('yjs-awareness', { docId, update });
        } catch (e) {
          console.error('Error cleaning up awareness on disconnect', e);
        }
      }
    });

    delete clients[userID];
  });

});

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = `${uploadDirPath}/attachments/${req?.query?.docId}/`;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      fs.chmodSync(uploadPath, 0o755);
    }
    cb(null, uploadPath); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, req?.query?.name); // Use the original file name
  },
});

const upload = multer({ storage });

// Endpoint for file upload
app.post('/global-editor-api/actionToUploadEditorAttachmentApiCall', upload.single('attachment'), (req, res) => {
  // Handle the uploaded file here.
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  // You can save the file information or perform other operations here.
  res.send('File uploaded successfully.');
});

app.get('/global-editor-api/actionToGetEditorAttachmentApiCall/:docId/:fileId', (req, res) => {
  const { docId, fileId } = req.params;
  let uploadPath = `${uploadDirPath}/attachments/${docId}`;
  const filePath = path.join(uploadPath, fileId);

  // Send the file to the client
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(err.status).end();
    } else {
      console.log('File sent:', filePath);
    }
  });
});

app.post('/global-editor-api/uploadEditorTestFileApiCall', (req, res) => {
  const { htmlData,docId } = req.body;
  if (!htmlData) {
    return res.status(400).json({ message: 'No text data received' });
  }


  // Define the path to the file
  const filePath = path.join(`${uploadDirPath}/editor_docs/editor_doc_${docId}.txt`);
  // Write the text data to the file
  fs.writeFile(filePath, htmlData, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ message: 'Failed to write data to file' });
    }
    res.json({ message: 'Text data written to file successfully' });
  });
});

app.get('/global-editor-api/getEditorTestFileApiCall/:docId', (req, res) => {
  const { docId } = req.params;

  if (!docId) {
    return res.status(400).json({ message: 'No doc id data received' });
  }

  const filePath = path.join(`${uploadDirPath}/editor_docs/editor_doc_${docId}.txt`);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    let dataToWrite = `<div data-block-id="block-${docId}" class="content_section_inner_container gl_doc_selectable_div editable_content_section normal_text"></div>`;
    // If the file doesn't exist, create it with some default content
    fs.writeFile(filePath, dataToWrite, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to create the file.' });
      }

      // Send the created file to the client
      return res.sendFile(filePath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).send('Failed to send the file.');
        }
      });
    });
  } else {
    // If the file exists, send it to the client
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Failed to send the file.');
      }
    });
  }
});


app.get('/global-editor-api', (req, res) => {
  res.send(`Node Server is ready at port ${port}`);
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// Start the server
server.listen(port, host, () => {
  console.log('[SOCKET.IO SERVER CONNECTED TO PORT]', port);
});
