const EventEmitter = require("events")
const net = require("net")

const HttpRequest = require("./HttpRequest")
const HttpResponse = require("./HttpResponse")

class HttpServer extends EventEmitter {

    constructor(requestHandler) {
        super()
        this.request = null
        this.response = null
        this.httpServer = net.createServer()
        this.httpServer.on("connection", this._initializeRequestResponse)

        if(requestHandler) {
            this.on("request", () => requestHandler(this.request, this.response))
        }
    }

    listen(port, callback) {
        this.httpServer.listen(port, callback)
    }

    _initializeRequestResponse = (socket) => {
        this.request = new HttpRequest(socket)
        this.response = new HttpResponse(socket)

        this.request.on("headers", () => {
            this.emit("request", this.request, this.response)
        })
    }
}

module.exports = HttpServer