import express from 'express';
import { Server } from 'socket.io'; // Import Socket.IO Server
import http from 'http';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import * as Y from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness';
import pool from "./connection.js";
import {insertCommonApiCall, updateCommonApiCall} from "./commonModelHelper.js";

const yDocs = new Map();           // docId -> Y.Doc
const awarenessStates = new Map(); // docId -> Awareness
const yDocMeta = new Map();        // docId -> meta (object_id, object_type, timebox_appended_note_type_id)
// Track which docs we already pulled from DB
const loadedDocsFromDB = new Set();
// Debounce timers per doc
const saveTimers = new Map();

function getYDoc(docId, meta = {}) {
  let doc = yDocs.get(docId);
  if (!doc) {
    doc = new Y.Doc();
    yDocs.set(docId, doc);
    attachAutosave(docId, doc);
  }

  const { object_id, object_type, timebox_appended_note_type_id } = meta;
  if (
      object_id !== undefined ||
      object_type !== undefined ||
      timebox_appended_note_type_id !== undefined
  ) {
    const existing = yDocMeta.get(docId) || {};
    yDocMeta.set(docId, {
      object_id: object_id !== undefined ? object_id : existing.object_id ?? null,
      object_type: object_type !== undefined ? object_type : existing.object_type ?? null,
      timebox_appended_note_type_id:
          timebox_appended_note_type_id !== undefined
              ? timebox_appended_note_type_id
              : existing.timebox_appended_note_type_id ?? null,
    });
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

/**
 * Load existing Yjs state from DB into this ydoc (if it exists).
 */
async function loadYDocFromDB(docId, ydoc) {
  if (loadedDocsFromDB.has(docId)) return;

  try {
    const res = await pool.query(
        'SELECT y_state FROM global_editor_doc_data WHERE id = $1',
        [docId],
    );

    if (res.rows.length > 0 && res.rows[0].y_state) {
      const buf = res.rows[0].y_state; // Buffer from Postgres
      const u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
      Y.applyUpdate(ydoc, u8);
    }

    loadedDocsFromDB.add(docId);
  } catch (e) {
    console.error('Error loading YDoc from DB', e);
  }
}

/**
 * Upsert Y.Doc into DB (insert if not exists, else update).
 * For now we keep doc_html NULL; you can pass HTML later.
 */
async function upsertYDocToDB(docId, ydoc) {
  const update = Y.encodeStateAsUpdate(ydoc);
  const buffer = Buffer.from(update);
  const {
    object_id = null,
    object_type = null,
    timebox_appended_note_type_id = null,
  } = yDocMeta.get(docId) || {};

  const updateColumns = [
    'y_state = $1',
    'updated_at = now()',
    'object_id = $2',
    'object_type = $3',
    'timebox_appended_note_type_id = $4',
  ];
  const updateValues = [buffer, object_id, object_type, timebox_appended_note_type_id];

  // 1) try UPDATE
  const updated = await updateCommonApiCall({
    tableName: 'global_editor_doc_data',
    column: updateColumns,
    value: updateValues,
    whereCondition: `id = '${docId}'`,
    returnColumnName: 'id',
  });

  if (updated && updated.length > 0) {
    return; // row existed, done
  }

  // 2) no row -> INSERT
  await insertCommonApiCall({
    tableName: 'global_editor_doc_data',
    column: ['id', 'y_state', 'doc_html', 'object_id', 'object_type', 'timebox_appended_note_type_id'],
    alias: ['$1', '$2', '$3', '$4', '$5', '$6'],
    values: [docId, buffer, null, object_id, object_type, timebox_appended_note_type_id],
  });
}

async function upsertYDocHtmlToDB(docId, html) {
  // 1) try UPDATE
  const updated = await updateCommonApiCall({
    tableName: 'global_editor_doc_data',
    column: ['doc_html = $1', 'updated_at = now()'],
    value: [html],
    whereCondition: `id = '${docId}'`,
    returnColumnName: 'id',
  });

  if (updated && updated.length > 0) {
    return; // row existed, done
  }
}

/**
 * Attach a debounced autosave to a Y.Doc
 */
function attachAutosave(docId, ydoc) {
  ydoc.on('update', () => {
    // debounce: save 2s after last change
    if (saveTimers.has(docId)) {
      clearTimeout(saveTimers.get(docId));
    }

    const t = setTimeout(() => {
      upsertYDocToDB(docId, ydoc).catch(err =>
          console.error('Error autosaving YDoc to DB', err),
      );
    }, 2000);

    saveTimers.set(docId, t);
  });
}


const app = express();

app.use(
    cors({
      origin: '*',
    }),
);
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  return next();
});
app.use(express.urlencoded({ extended: true, limit: '250mb' }));
app.use(express.json({ limit: '250mb' }));
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

  // Client joins a Yjs document
  socket.on('joinYDoc', async (payload = {}) => {
    const {
      docId,
      object_id,
      object_type,
      timebox_appended_note_type_id,
    } = typeof payload === 'string' ? { docId: payload } : (payload || {});

    if (!docId) return;

    console.log(`Client ${userID} joining YDoc: ${docId}`);
    socket.join(docId);
    joinedYDocs.add(docId);

    const ydoc = getYDoc(docId, { object_id, object_type, timebox_appended_note_type_id });

    // 🔹 ensure we have the latest state from DB
    await loadYDocFromDB(docId, ydoc);

    // Send the FULL current state of the Y.Doc to this client
    try {
      const update = Y.encodeStateAsUpdate(ydoc);
      socket.emit('yjs-update', { docId, update });
    } catch (e) {
      console.error('Error encoding Yjs state for joinYDoc', e);
    }
  });


  socket.on('yjs-save-html', async ({ docId, html }) => {
    await upsertYDocHtmlToDB(docId, html);
  });

  // Receive Yjs document updates from a client
  socket.on('yjs-update', ({ docId, update, object_id, object_type, timebox_appended_note_type_id }) => {
    if (!docId || !update) return;

    const ydoc = getYDoc(docId, { object_id, object_type, timebox_appended_note_type_id });

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
    // joinedYDocs.forEach((docId) => {
    //   const awareness = awarenessStates.get(docId);
    //   if (awareness) {
    //     try {
    //       awareness.removeAwarenessStates([socket.id], 'disconnect');
    //       const update = awarenessProtocol.encodeAwarenessUpdate(awareness, [socket.id]);
    //       socket.to(docId).emit('yjs-awareness', { docId, update });
    //     } catch (e) {
    //       console.error('Error cleaning up awareness on disconnect', e);
    //     }
    //   }
    // });

    delete clients[userID];
  });
});

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // docId comes from URL params: /:docId/:name
    const docId = req.params.docId || req.query.docId || req.body.docId;

    if (!docId) {
      return cb(new Error('Missing docId'), null);
    }

    const uploadPath = `${uploadDirPath}/attachments/${docId}/`;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      fs.chmodSync(uploadPath, 0o755);
    }

    cb(null, uploadPath); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    // use :name param if provided, fallback to original file name
    const name = req.params.name || req.query.name || file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage });

app.post(
    '/global-editor-api/actionToUploadEditorAttachmentApiCall/:docId/:name',
    upload.single('attachment'),
    (req, res) => {
      const file = req.file;
      const { docId, name } = req.params;

      if (!file) {
        return res
            .status(400)
            .json({ success: false, message: 'No file uploaded.' });
      }
      if (!docId) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing docId.' });
      }
      if (!name) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing name.' });
      }

      const fileId = name;

      const baseUrl =
          process.env.PUBLIC_BACKEND_URL || 'https://backend.timebox.ai';

      const url = `${baseUrl}/global-editor-api/actionToGetEditorAttachmentApiCall/${docId}/${fileId}`;

      return res.json({
        success: true,
        fileId,
        url,
      });
    },
);

app.get(
    '/global-editor-api/actionToGetEditorAttachmentApiCall/:docId/:fileId',
    (req, res) => {
      const { docId, fileId } = req.params;
      const uploadPath = `${uploadDirPath}/attachments/${docId}`;
      const filePath = path.join(uploadPath, fileId);

      res.sendFile(filePath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(err.status || 500).end();
        } else {
          console.log('File sent:', filePath);
        }
      });
    },
);

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
