const http2 = require('node:http2');
const fs = require('node:fs');

const server = http2.createSecureServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
})
// const server = http2.createServer();
// server.on('error', (err) => {
//     console.error('Server error:', err);
// });

server.on('stream', (stream, headers) => {
    const path = headers[':path'];
    const method = headers[':method'];

    console.log('New request:', {
        timestamp: new Date().toISOString(),
        method: method,
        path: path,
        headers: headers,
    });

    stream.on('error', (err) => {
        console.error('Stream error:', err);
    });

    stream.respond({
        'content-type': 'text/html; charset=utf-8',
        ':status': 200,
    });
    stream.end('<h1>Hello World</h1>');
});

server.listen(3000);
