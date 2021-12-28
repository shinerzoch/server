const fastifyStatic = require('fastify-static');

let defaultOptions = {
    publicDir: "public"
}

module.exports = async (port, options) => {
    options = { ...defaultOptions, options };

    await Server.Router.register(fastifyStatic, {
        root: Server.path(options.publicDir),
        wildcard: false
    });

    await Server.Router.listen(port || 8080);
}