const { EntitySchema } = require('typeorm');

module.exports = async function generateTables(path) {
    const files = await $server.glob(path + '/*');
    let tables = [];

    for (const file of files) {
        let tableName = file.replace(".js", "");

        try {
            const table = require($server.path(path + "/" + file));
            const entity = new EntitySchema({
                name: tableName,
                columns: table.columns,
                uniques: table.uniques
            })
            tables.push(entity);
            console.log("[", "database", "]:", "Created model:", tableName);
        }

        catch (err) {
            console.error("[", "database", "]:", "Could not import model:", tableName, err);
        }
    }

    return tables;
}