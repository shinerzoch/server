const Server = require('../../../../../index');

module.exports = async (Database) => {
    try {
        const files = await Server.glob(Database.options.modulesPath + '/*');
        for await (let file of files) {
            const importedTable = require(Server.path(Database.options.modulesPath + '/'+ file));
            file = file.replace('.js', '');

            Database.sequelize.define(file, importedTable(Database.DataTypes), {
                timestamps: false
            });
        }
    }

    catch (err) {
        console.error(err)
    }
}