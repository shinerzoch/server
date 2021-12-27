console.clear();

class Server {}

global.Server = Server;

Server.path = dir => require('path').resolve(dir);

Server.glob = require('./classes/Glob').glob;

Server.generateID = require('./functions/generateID');
Server.start = require('./functions/start');

Server.Router = require('fastify')({ logger: { level: "error" } });

Server.Database = require('./modules/Database');
Server.Cookies = require('./modules/Cookies');
Server.Session = require('./modules/Session');
Server.AutoRoutes = require('./modules/AutoRoutes');
Server.ServerSideEvents = require('./modules/ServerSideEvents');
Server.WebSockets = require('./modules/WebSockets');

exports.Server = Server;
module.exports = Server;