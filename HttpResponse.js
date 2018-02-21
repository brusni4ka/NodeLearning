const {Writable} = require('stream');
const status_codes = require('./status_codes');

class HttpResponse extends Writable {

    constructor(source) {
        super();
        this.headers = {};
        this.isHeadersSent = false;
        this._stream = source;
    }

    _write(chunk) {
        if(!this.isHeadersSent) {
            this.writeHead(200, this.headers);
        }
        this._stream.end(chunk);
    }

    setHeader(headerName, value) {
        this.headers[headerName] = value;
    }

    writeHead(statusCode, headers = {}) {
        const message = status_codes[statusCode];
        const reducedHeaders = this._reduceHeaders(headers);
        if(!this.isHeadersSent) {
            this.isHeadersSent = true;
            console.log('headers', `HTTP/1.0 ${statusCode} ${message}\r\n${reducedHeaders}\r\n`);
            //this._stream.write("HTTP/1.0 400 \r\nContent-Type:text/html\r\n\r\n<h1>NO SUCH FILE</h1>")
            this._stream.write(`HTTP/1.0 ${statusCode} ${message}\r\n${reducedHeaders}\r\n\r\n`);
        }
    }

    _reduceHeaders(headers) {
        return Object.keys(headers).reduce((result, header) => {
            return `${header} ${headers[header]}\r\n`
        },'')
    }

}

module.exports = HttpResponse;

