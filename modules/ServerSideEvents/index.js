const fastifySSE = require('fastify-sse');

class ServerSideEvents {}
ServerSideEvents.enabled = false;

ServerSideEvents.install = async () => {
    Server.Router.register(fastifySSE);
    ServerSideEvents.enabled = true;
    console.log("[", "serversideevents", "]:", "Enabled");
}

module.exports = ServerSideEvents;