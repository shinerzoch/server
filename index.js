const server = {};
global.$server = server;

const Glob = require('./modules/Glob');
server.glob = new Glob().glob;

server.modules = {
    ["database"]: require('./modules/database'),
    ["cookies"]: require('./modules/cookies'),
    ["auto-routes"]: require('./modules/auto-routes'),
    ["server-side-events"]: require('./modules/server-side-events'),
    ["websockets"]: require('./modules/websockets'),
    ["proxy"]: require('./modules/proxy'),
    ["session"]: require('./modules/session')
};

server.generateID = require('./functions/generateID');
server.start = require('./functions/start');
server.path = dir => require('path').resolve(dir);
server.router = require('fastify')({ logger: { level: "error" } });
server.install = require('./functions/install');

exports.Server = server;
module.exports = server;