const fastifyStatic = require('fastify-static');

module.exports = async function start(options = { staticDir: "public", port: 8080 }) {
    await $server.router.register(fastifyStatic, {
        root: $server.path(options.staticDir),
        wildcard: false
    });

    await $server.router.listen(options.port || 8080);

    console.log("==============================================")
    console.log("         Server started on port", options.port)
    console.log(`         link: http://localhost:${options.port}`)
    console.log("==============================================")
}