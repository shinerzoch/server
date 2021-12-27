const { createConnection } = require('typeorm');
const generateTables = require('../../functions/generateTables');

class Local {
    constructor(options = {} ) {
        this.options = {
            modelsPath: options.modelsPath || "models"
        };
    }

    async create() {
        const generatedTables = await generateTables(this.options.modelsPath || "models");

        const db = await createConnection({
            name: this.options.database,
            type: "better-sqlite3",
            database: './data/' + this.options.database + '/datafile',
            entities: generatedTables,
            logging: true,
            synchronize: true
        });

        return {
            query: db.query,
            table(tableName) {
                return db.getRepository(tableName);
            }
        }
    }
}

module.exports = Local;