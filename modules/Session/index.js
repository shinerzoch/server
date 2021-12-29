const fastifySession = require('@mgcrea/fastify-session');

class Session {}
Session.name = "session";
Session.enabled = false;
Session.options = {};

Session.install = (options) => {
    options = { ...Session.options, ...options };

    $server.router.register(fastifySession, options);
    Session.enabled = true;
    console.log("[", "session", "]:", "Enabled");
}

module.exports = Session;