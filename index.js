console.clear();

class Server {}

global.Server = Server;

Server.glob = require('./modules/Glob').glob;

Server.path = dir => require('path').resolve(dir);

Server.generateID = require('./functions/generateID');
Server.start = require('./functions/start');

Server.Router = require('fastify')({ logger: { level: "error" } });

Server.Database = require('./modules/Database');
Server.Cookies = require('./modules/Cookies');
Server.Session = require('./modules/Session');
Server.AutoRoutes = require('./modules/AutoRoutes');
Server.ServerSideEvents = require('./modules/ServerSideEvents');
Server.WebSockets = require('./modules/WebSockets');
Server.Proxy = require('./modules/Proxy');

exports.Server = Server;
module.exports = Server;