const { EntitySchema } = require('typeorm');

module.exports = async (path) => {
    const files = await Server.glob(path + '/*');
    let tables = [];

    for (const file of files) {
        let tableName = file.replace(".js", "");

        try {
            const table = require(Server.path(path + "/" + file));
            const entity = new EntitySchema({
                name: tableName,
                columns: table.columns,
                uniques: table.uniques
            })
            tables.push(entity);
            console.log("[", "database", "]:", "Created model:", tableName, entity.options);
        }

        catch (err) {
            console.error("[", "database", "]:", "Could not import model:", tableName, err);
        }
    }

    return tables;
}