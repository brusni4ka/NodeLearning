const HttpServer = require('./HttpServer');

const http = (function () {

    const createServer = (callback) => {
        return new HttpServer(callback);
    }

    return {
        createServer
    }

}());


module.exports = http;