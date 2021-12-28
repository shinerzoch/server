const { createConnection } = require('typeorm');
const generateTables = require('../../functions/generateTables');

class Local {
    constructor(options = {} ) {
        this.options = {
            name: "default",
            logging: false,
            synchronize: false,
            ...options,
        };
    }

    async create() {
        let db;
        if (this.options.tables && !this.options.modelsPath) {
            db = await createConnection({
                name: this.options.name,
                type: "better-sqlite3",
                database: './data/' + this.options.name + '/datafile',
                entities: this.options.tables,
                logging: this.options.logging,
                synchronize: this.options.synchronize
            });
        }

        else if (this.options.tables && this.options.modelsPath) {
            const generatedTables = await generateTables(this.options.modelsPath);
            const tables = [...generatedTables, ...this.options.tables];

            db = await createConnection({
                name: this.options.name,
                type: "better-sqlite3",
                database: './data/' + this.options.name + '/datafile',
                entities: tables,
                logging: this.options.logging,
                synchronize: this.options.synchronize
            });
        }

        else if (!this.options.tables && this.options.modelsPath) {
            const generatedTables = await generateTables(this.options.modelsPath);

            db = await createConnection({
                name: this.options.name,
                type: "better-sqlite3",
                database: './data/' + this.options.name + '/datafile',
                entities: generatedTables,
                logging: this.options.logging,
                synchronize: this.options.synchronize
            });
        }

        else {
            return {
                error: true,
                message: "Invalid database params."
            }
        }

        return {
            query: db.query,
            table(tableName) {
                return db.getRepository(tableName);
            }
        }
    }
}

module.exports = Local;