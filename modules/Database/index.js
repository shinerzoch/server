class Database {};
Database.name = "database";
Database.enabled = false;

Database.options = {
    instanceName: "default"
}

Database.databases = {};

Database.types = new Map();
Database.types.set("mysql", require('./types/mysql'));
Database.types.set("local", require('./types/local'));

Database.get = (databaseName) => Database.databases[databaseName];

Database.install = async (options) => {
    options = { ...Database.options, ...options };
    console.log("[ database ]:", "Installing", options.type, "with the instance name of", options.instanceName);

    const DatabaseClass = Database.types.get(options.type);

    const Instance = new DatabaseClass(options);
    Database.databases[options.instanceName] = await Instance.create();
    if (options.default) {
        $server.db = Database.databases[options.instanceName];
    }
}

module.exports = Database;