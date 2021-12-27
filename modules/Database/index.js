class Database {}
Database.enabled = false;

Database.types = {
    local: require('./types/local'),
    mysql: require('./types/mysql'),
    prisma: require('./types/prisma')
}

Database.create = async (type = "", options = {}) => {
    options.name = options.name? options.name: "default";
    options.modelsPath = options.modelsPath? options.modelsPath: "models";

    console.log("[ database ]:", "Installing", type + "...");

    if (Database.types[type]) {
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