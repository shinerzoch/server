const { createLogger, format, transports } = require('winston');

const customConsole = createLogger({
    level: "all",
    format: format.prettyPrint(),
    transports: [
        new transports.Console()
    ],
});

module.exports = customConsole;