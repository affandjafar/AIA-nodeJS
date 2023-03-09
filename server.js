// 
// const server = http.createServer((req, res) => {
//     console.log(req.url);
//     if (req.url === '/' || req.url === '/home') {
//         fs.readFile(__dirname + '/index.html', (err, data) => {
//             if (err) {
//                 console.log(err);
//                 res.writeHead(500, { 'Content-Type': 'text/html' });
//                 res.write('<h1>500 Internal Server Error</h1>');
//                 res.end()
//             } else {
//                 res.writeHead(200, { 'Content-Type': 'text/html' });
//                 res.write(data);
//                 res.end();
//             }
//         });
//     } else if (req.url === '/about') {
//         fs.readFile(__dirname +  '/about.html', (err, data) => {
//             if (err) {
//                 res.writeHead(500, { 'Content-Type': 'text/html' });
//                 res.write('<h1>500 Internal Server Error</h1>');
//                 res.end()
//             } else {
//                 res.writeHead(200, { 'Content-Type': 'text/html' });
//                 res.write(data);
//                 res.end();
//             }
//         });
//     } else if (req.url === '/contact') {
//         fs.readFile(__dirname + '/contact.html', (err, data) => {
//             if (err) {
//                 res.writeHead(500, { 'Content-Type': 'text/html' });
//                 res.write('<h1>500 Internal Server Error</h1>');
//                 res.end()
//             } else {
//                 res.writeHead(200, { 'Content-Type': 'text/html' });
//                 res.write(data);
//                 res.end();
//             }
//         });
//     } else if (req.url === '/inquiry') {
//         fs.readFile(__dirname + '/inquiry.html', (err, data) => {
//             if (err) {
//                 res.writeHead(500, { 'Content-Type': 'text/html' });
//                 res.write('<h1>500 Internal Server Error</h1>');
//                 res.end()
//             } else {
//                 res.writeHead(200, { 'Content-Type': 'text/html' });
//                 res.write(data);
//                 res.end();
//             }
//         });
//     } else if (req.url === '/help') {
//         fs.readFile(__dirname + '/help.html', (err, data) => {
//             if (err) {
//                 res.writeHead(500, { 'Content-Type': 'text/html' });
//                 res.write('<h1>500 Internal Server Error</h1>');
//                 res.end()
//             } else {
//                 res.writeHead(200, { 'Content-Type': 'text/html' });
//                 res.write(data);
//                 res.end();
//             }
//         });

//     } else if (req.url === '/assets/css/main.css') {
//         fs.readFile(__dirname + '/assets/css/main.css', (err, data) => {
//             if (err) {
//                 res.writeHead(500, { 'Content-Type': 'text/html' });
//                 res.write('<h1>500 Internal Server Error</h1>');
//                 res.end()
//             } else {
//                 res.writeHead(200, { 'Content-Type': 'text/html' });
//                 res.write(data);
//                 res.end();
//             }
//         });
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/html' });
//         res.write('<h1>404 Not Found</h1>');
//         res.end();
//     }
// });



const http = require('http');
const fs = require('fs');

const server = http.createServer(function (request, response) {
    switch (request.url) {
        case "/":
            request.url = "/index.html"
            break;
        case "/about":
            request.url = "/about.html"
            break;
        case "/contact":
            request.url = "/contact.html"
            break;
        case "/help":
            request.url = "/help.html"
            break;
        case "/inquiry":
            request.url = "/inquiry.html"
            break;
        default:
            break;
    }

    fs.readFile('./' + request.url, function (err, data) {
        if (!err) {
            console.log(err);
            var dotoffset = request.url.lastIndexOf('.');
            var mimetype = dotoffset == -1
                ? 'text/plain' : {
                    '.html': 'text/html',
                    '.ico': 'images/x-icon',
                    '.jpg': 'images/jpeg',
                    '.png': 'images/png',
                    '.gif': 'images/gif',
                    '.css': 'text/css',
                    '.js': 'text/javascript'
                }
                [request.url.substr(dotoffset)];
            response.setHeader('Content-type', mimetype);
            response.end(data);
            console.log(request.url, mimetype);
        } else {
            console.log('file not found: ' + request.url);
            response.writeHead(404, "Not Found");
            response.end();
        }
    });
});

server.listen(3000, () => {
    console.log('server started on port 3000');
})