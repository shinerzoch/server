const { createConnection } = require('typeorm');
const generateTables = require('../../functions/generateTables');

class Mysql {
    constructor(options = {} ) {
        this.options = {
            name: "mysql",
            modelsPath: "models",
            host: "localhost",
            port: 3306,
            username: "test",
            password: "test",
            database: "test",
            logging: false,
            synchronize: false,
            ...options
        }
    }

    async create() {
        const generatedTables = await generateTables(this.options.modelsPath);

        console.log(this.options);
        const db = await createConnection({
            name: this.options.name,
            type: "mysql",
            host: this.options.host,
            port: this.options.port,
            username: this.options.username,
            password: this.options.password,
            database: this.options.database,
            entities: generatedTables,
            logging: this.options.logging,
            synchronize: this.options.synchronize
        });

        return {
            query: db.query,
            table(tableName) {
                return db.getRepository(tableName);
            }
        }
    }
}

module.exports = Mysql;