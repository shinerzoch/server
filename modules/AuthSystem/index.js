const MemoryDatabase = require('./Databases/memory');
const FileSystem = require('./Databases/fileSystem');

class AuthSystem {}
AuthSystem.enabled = false;
AuthSystem.users = new Map();

AuthSystem.install = async (options = {}) => {
    console.log("[", "authsystem", "]:", "Installing...");
    AuthSystem.options = options;

    if (!Server.Cookies.enabled || !Server.Session.enabled) {
        console.error("[", "authsystem", "]:", "Could not install, please make sure you have Cookies and Session installed!");
        return false;
    }

    if (!Server.Database.enabled || options.databaseTable === "filesystem") {
        const database = new FileSystem();
        await database.init();
        options.databaseTable = database;
        console.log("[", "authsystem", "]:", "Auth System running on filesystem. This is a file base database, which means its slower then mysql, or mongodb.");
    }

    if (options.databaseTable === "memory") {
        options.databaseTable = new MemoryDatabase();
        console.log("[", "authsystem", "]:", "Auth System running on memory. This means all data will be erased once the server is restarted.");
    }

    AuthSystem.enabled = true;
    console.log("[", "authsystem", "]:", "Installed");
}

AuthSystem.register = require('./Register');

module.exports = AuthSystem;