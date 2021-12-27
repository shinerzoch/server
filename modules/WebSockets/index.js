const fastifyWebsockets = require("fastify-websocket")
class WebSockets {}
WebSockets.enabled = false;
WebSockets.install = async (options) => {
    Server.Router.register(fastifyWebsockets, options);
    WebSockets.enabled = true;
    console.log("[", "websockets", "]:", "Enabled");
}

module.exports = WebSockets