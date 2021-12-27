const fastifySession = require('@mgcrea/fastify-session');

class Session {}
Session.enabled = false;

Session.install = (options) => {
    Server.Router.register(fastifySession, options);
    Session.enabled = true;
    console.log("[", "session", "]:", "Enabled");
}

module.exports = Session;