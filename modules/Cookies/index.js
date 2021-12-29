const fastifyCookie = require("fastify-cookie");

class Cookies {};
Cookies.name = "cookies";
Cookies.enabled = false;

Cookies.install = () => {
    $server.router.register(fastifyCookie, Cookies.options);
    Cookies.enabled = true;
    console.log("[", "cookies", "]:", "Enabled");
}

Cookies.enabled = false;

module.exports = Cookies;