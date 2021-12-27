class User {
    constructor(user) {
        this.id = user.id || Server.generateID(128);
    }
}

async function createUser(req, res) {
    let id = req.session.get('authKey');
    let data;

    if (id) {
        data = await Server.AuthSystem.options.databaseTable.findOne({ authKey: id });
    }

    else {
        data = {}
    }

    return new User(data);
}

module.exports.User = User;
module.exports.createUser = createUser;