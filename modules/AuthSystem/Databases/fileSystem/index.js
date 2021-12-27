const { nSQL } = require("@nano-sql/core");

class FileSystem {
    constructor() {
        this.db = undefined;
    }

    async init() {

    }

    findOne(where) {
        nSQL().useDatabase("AuthSystem");
        const db = nSQL("users");

        console.log(db.query("select").where(where).exec());
        return {}
    }

    create(data) {
        nSQL().useDatabase("AuthSystem");
        const db = nSQL("users");
        console.log(db)
        return db.query("upsert", [data]).exec();
    }
}

module.exports = FileSystem;