const fastifyWebsockets = require("fastify-websocket");

class WebSockets {}
WebSockets.name = "websockets";
WebSockets.options = {};
WebSockets.enabled = false;

WebSockets.install = async (options) => {
    options = { ...WebSockets.options, ...options };
    $server.router.register(fastifyWebsockets, options);
    WebSockets.enabled = true;
    console.log("[", "websockets", "]:", "Enabled");
}

module.exports = WebSockets