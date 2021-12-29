const fastifySSE = require('fastify-sse');

class ServerSideEvents {}
ServerSideEvents.name = "server-side-events";
ServerSideEvents.options = {}
ServerSideEvents.enabled = false;

ServerSideEvents.install = async () => {
    $server.router.register(fastifySSE);
    ServerSideEvents.enabled = true;
    console.log("[", "serversideevents", "]:", "Enabled");
}

module.exports = ServerSideEvents;