const proxy = require('fastify-http-proxy');

class Proxy {}
Proxy.name = "proxy";
Proxy.options = {
    upstream: "http://localhost:3000",
    prefix: undefined,
    http2: false
};

Proxy.install = (options) => {
    options = { ...Proxy.options, ...options };
    $server.router.register(proxy, options);
    console.log("[", "proxy", "]:", "Enabled");
}

module.exports = Proxy;