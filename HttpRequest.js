const {Readable} = require('stream');
const {StringDecoder} = require('string_decoder');
const parseRequest = require('./utils/parseRequest');

class HttpRequest extends Readable {

    constructor(source) {
        super();
        this.headers = null;
        this.method = '';
        this.url = '';
        this.readable = true
        this._stream = source;
        this._parseHeader(this._stream);

    }

    // _read(size) {
    //     this._parseHeader(this._stream)
    // }

    _parseHeader(stream, callback) {
        //stream.on('error', callback);
        stream.on('readable', onReadable);
        const decoder = new StringDecoder('utf8');
        let header = '';
        let _this = this;

        function onReadable() {
            let chunk = stream.read()
            do {
                let str = decoder.write(chunk);
                if (str.match(/\r\n\r\n/)) {
                    // нахождение границ заголовка
                    let split = str.split('\r\n\r\n');
                    header += split.shift();
                    const remaining = split.join('\r\n');
                    const buf = Buffer.from(remaining, 'utf8');
                    //stream.removeListener('error', callback);
                    stream.removeListener('readable', onReadable);
                    if (buf.length)
                        stream.unshift(buf);
                    if (header) {
                        const {headers, method, url} = parseRequest(header);
                        _this.headers = headers;
                        _this.method = method;
                        _this.url = url;
                    }
                    console.log('in parse header')
                    _this.emit("headers");
                    _this.push(buf);
                } else {
                    header += str;
                }
            } while (null !== (chunk = stream.read()))
            _this.push(null);
        }
    }

}


module.exports = HttpRequest;

