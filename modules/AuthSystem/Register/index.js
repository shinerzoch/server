module.exports = async (data = { username: String, email: String, password: String, confirmPassword: String }) => {
    let response = {
        error: false,
        errors: []
    }

    if (!data.username) {
        response.error = true;
        response.errors.push({
            type: "username",
            message: "Username required."
        });
    }

    else if (!data.password) {
        response.error = true;
        response.errors.push({
            type: "password",
            message: "Password required."
        });
    }

    else {
        if (data.username.length < 3) {
            response.error = true;
            response.errors.push({
                type: "username",
                message: "Username needs to be more then 3 correctors."
            });
        }

        else {
            delete data.confirmPassword;
            return Server.AuthSystem.options.databaseTable.create(data)
        }
    }

    return response;
}