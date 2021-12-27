const Sequelize = require('sequelize');
const importModels = require('./functions/importModels');

const getDocument = require('./functions/getDocument');
const postDocument = require('./functions/postDocument');
const updateDocument = require('./functions/updateDocument');

class Database {}

Database.options = {};
Database.db = undefined;

Database.DataTypes = Sequelize.DataTypes;
Database.Sequelize = Sequelize.Sequelize;

Database.init = async (options) => {
    Database.options = options;
    Database.sequelize = new Database.Sequelize(options.name, options.user, options.pass, {
        host: options.host,
        port: options.port,
        dialect: 'mysql',
        pool: {
            max: 1,
            min: 1
        },
        logging: false
    });

    try {
        await Database.sequelize.authenticate();
        console.log('[ database ]:', 'Connected!');
        await importModels(Database);

        await Database.sequelize.sync({
            force: options.force,
            alter: options.alter
        });

        const db = Database.sequelize.models;

        console.log('[ database ] Synced -', db);
        console.log('[ database ] Connected & Started Successfully!');

        return {
            table: (tableName) => {
                return {
                    findOne: async (where) => {
                        const data = await db[tableName].findOne({ where });
                        if (data) {
                            return data.dataValues;
                        }
                    },
                    findAll: db[tableName].findAll,
                    create: (data) => db[tableName].create(data),
                    update: async (data) => {
                        await db[tableName].update(data.data, { where });
                        return await db[tableName].findOne({ where });
                    },
                    delete: db[tableName].destroy
                }
            }
        }
    }

    catch (err) {
        console.error({
            title: 'DATABASE ERROR',
            message: err
        });

        process.exit(1)
    }
}

Database.get = async (document) => getDocument(Database.sequelize.models.documents, document);
Database.post = async (name, data) => postDocument(Database.sequelize.models.documents, name, data);
Database.update = async (data) => updateDocument(Database.sequelize.models.documents, data);

module.exports = Database;