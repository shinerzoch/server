const { nSQL } = require('@nano-sql/core');

class Database {}
Database.enabled = false;

Database.options = {};
Database.Client = nSQL();

Database.types = {
    local: require('./types/local'),
    mysql: require('./types/mysql'),
    prisma: require('./types/prisma')
}

Database.create = async (type = "", options = {}) => {
    console.log("[ database ]:", "Installing", type + "...");

    if (Database.types[type] && options.default) {
        options.name = "default";

        const Instance = new Database.types[type](options);
        return await Instance.create();
    }

    else if (Database.types[type]) {
        const Instance = new Database.types[type](options);
        return await Instance.create();
    }

    else {
        return {
            error: true,
            message: "Invalid Database type."
        }
    }
}

module.exports = Database;