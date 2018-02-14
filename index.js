const net = require('net');
const fs = require('fs');
//const JsonSocket = require('json-socket');
const PORT = process.env.PORT || 8124;
// var socket = net.createConnection({
//     host: '12.34.56.67', // Adjust this if needed
//     port: 3306 // Adjust this if needed
// });
// socket.on('error', function onError(err) { throw err; });
// socket.on('connect', function onConnect() {
//     console.log('connected');
//     //socket.destroy()
//     socket.write('Hi there');
// });

// const client = net.createConnection({
//     host: '0.0.0.0', // Adjust this if needed
//     port: 3306 // Adjust this if needed
// }, () => {
//     //'connect' listener
//     console.log('connected to server!');
//     client.write('world!\r\n');
// });
//
//
// client.on('connect', function onConnect() {
//     console.log('connected');
//     //socket.destroy()
//     client.write('Hi there');
// });

const server = net.createServer((socket)=>{
    console.log('client connected!');
    // socket.write(JSON.stringify({
    //     'Request Method':'GET',
    //     'Status Code': 200,
    //     'Referrer Policy':'unsafe-url'
    // }));

    let buffer = [];
    socket.on('data', function (chunk) {
        console.log('DATA ' +  chunk);
        buffer.push(chunk);
        let body = Buffer.concat(buffer).toString();
        if(body.slice(-4) === '\r\n\r\n') {
            const parsedBody = body.split('\r\n');
            const method = parsedBody[0].match(/^\w+\s/)[0];
            const url =  parsedBody[0].match(/\s\/\w+/)[0];
            console.log('method',method, '|url',url, '|body', parsedBody);

            if(url === '/image') {

            }
            //socket.write("HTTP/1.0 200 OK\r\nContent-Type:image/jpeg");
        }
        //const img = fs.readFileSync('./static/cat.jpeg');

        // socket.write("HTTP/1.0 200 OK\r\nContent-Type:image/jpeg");
        // var stream = fs.createReadStream('./static/cat.jpeg');
        // stream.pipe(socket);
    })
})

server.listen(PORT, () => {
    console.log('server bound');
});




// const port = 3000
//
// const requestHandler = (request, response) => {
//     console.log(request.url)
//     response.end('Hello Node.js Server!')
// }
//
// const server = http.createServer(requestHandler)
//
// server.listen(port, (err) => {
//     if (err) {
//         return console.log('something bad happened', err)
//     }
//
//     console.log(`server is listening on ${port}`)
// })