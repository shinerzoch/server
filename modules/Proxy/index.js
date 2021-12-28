const proxy = require('fastify-http-proxy');

class Proxy {}

Proxy.options = {
    upstream: "http://localhost:3000",
    prefix: undefined,
    http2: false
}

Proxy.install = (options) => {
    Proxy.options = { ...Proxy.options, ...options };

    Server.Router.register(proxy, Proxy.options);
    console.log("[", "proxy", "]:", "Enabled");
}

module.exports = Proxy;