const fastifyCookie = require("fastify-cookie");

class Cookies {}
Cookies.enabled = false;

Cookies.install = (options = {}) => {
    Server.Router.register(fastifyCookie, options);
    Cookies.enabled = true;
    console.log("[", "cookies", "]:", "Enabled");
}

module.exports = Cookies;