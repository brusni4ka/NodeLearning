const net = require('net');
const fs = require('fs');
const path = require('path');
const url = require('url');
const PORT = process.env.PORT || 8124;
const ROOT = __dirname + "/static";
const END_MESSAGE = '\r\n\r\n';
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
};
const HttpRequest = require('./HttpRequest');

const sendFileIfExst = (filePath, res) => {
    try{
        filePath = decodeURIComponent(filePath);
    }catch(e){
        res.end("HTTP/1.0 400 \r\nContent-Type:text/html\r\n\r\n<h1>Bad request</h1>\r\n\r\n");
    }

    filePath = path.normalize(path.join(ROOT, filePath));

    fs.stat(filePath, (err, stats) => {
        if(err || !stats.isFile()){
            res.end("HTTP/1.0 404 \r\nContent-Type:text/html\r\n\r\n<h1>NO SUCH FILE</h1>\r\n\r\n");
            return;
        }

        sendFile(filePath, res);
    });
}

const sendFile = (filePath, res) => {
    fs.readFile(filePath, (err, data) => {
                if(err){
                    res.write("HTTP/1.0 400 \r\nContent-Type:text/html\r\n\r\n<h1>NO SUCH FILE</h1>")
                } else{
                    const ext = path.parse(filePath).ext;
                    console.log(mimeType[ext]);
                    res.write(`HTTP/1.0 200 \r\nContent-Type:${mimeType[ext] || 'text/plain'}${END_MESSAGE}`);

                    // let extensionName = path.extname(`${process.cwd()}/static/cat.jpeg`);
                    // //convert image file to base64-encoded string
                    // let base64Image = new Buffer(data, 'binary').toString('base64');
                    // //combine all strings
                    // let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
                    // socket.write("HTTP/1.0 200 OK\r\nContent-Type:text/html\r\n\r\n")
                    res.end(data);
                }
            });
}

// const server = net.createServer((socket)=> {
//     console.log('client connected!');
//
//     let buffer = [];
//     const req = new HttpRequest(socket);
//     req.on('data', function (chunk) {
//         console.log('chunk',chunk);
//         console.log(req.method);
//     })
//
//     // socket.on('data', function (chunk) {
//     //     buffer.push(chunk);
//     //     let body = Buffer.concat(buffer).toString();
//     //     if(body.slice(-4) === END_MESSAGE) {
//     //         const req = parseRequestData(body);
//     //
//     //         sendFileIfExst(url.parse(req.url).pathname, socket);
//     //
//     //         // if(url.trim() === '/image') {
//     //         //     fs.readFile('./static/cat.jpeg', function(err, data){
//     //         //
//     //         //         if(err){
//     //         //             socket.write("HTTP/1.0 400 \r\nContent-Type:text/html\r\n\r\n<h1>NO SUCH FILE</h1>")
//     //         //         } else{
//     //         //             let extensionName = path.extname(`${process.cwd()}/static/cat.jpeg`);
//     //         //
//     //         //             //convert image file to base64-encoded string
//     //         //             let base64Image = new Buffer(data, 'binary').toString('base64');
//     //         //
//     //         //             //combine all strings
//     //         //             let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
//     //         //             socket.write("HTTP/1.0 200 OK\r\nContent-Type:text/html\r\n\r\n")
//     //         //             socket.end(`<img src='${imgSrcString}'/>`);
//     //         //         }
//     //         //     });
//     //         // } else if(url.trim()  === '/home') {
//     //         //     fs.readFile('./static/home.html', 'utf-8', function(err, data){
//     //         //         if(err){
//     //         //             socket.write("HTTP/1.0 404 \r\nContent-Type:text/html\r\n\r\n<h1>NO SUCH FILE</h1>\r\n\r\n")
//     //         //         }else{
//     //         //             socket.write("HTTP/1.0 200 OK\r\nContent-Type:text/html\n\n")
//     //         //             socket.end(data);
//     //         //         }
//     //         //     });
//     //         // } else {
//     //         //     socket.write("HTTP/1.0 404 \r\nContent-Type:text/html\n\n")
//     //         //     socket.end("<h1>NO SUCH PAGE</h1>")
//     //         // }
//     //     }
//     //
//     // })
// })
//
// server.listen(PORT, () => {
//     console.log('server bound');
// });

const myHttp = require('./http');

const server = myHttp.createServer();

server.on('request', (req, res) => {
    console.log(req.headers, req.method, req.url);

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200) //Вызов writeHead опционален
    fs.createReadStream('./static/home.html').pipe(res);
});

server.listen(PORT, () => console.log('bounded'));


