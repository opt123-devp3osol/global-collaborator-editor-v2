const path = require('path');

module.exports = {
    entry: './src/editor.js',
    mode: 'development',
    output: {
        filename: 'global-collab-text-editor-lib-v2.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'GlobalTextEditorLibV2',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Serve static files from 'dist'
        },
        compress: true, // Enable gzip compression
        port: 9000, // Change to your desired port
        open: true, // Automatically open the browser
        hot: true, // Enable hot module replacement
        historyApiFallback: true, // For single-page applications
    },
};
