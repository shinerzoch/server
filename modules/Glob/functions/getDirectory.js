const fs = require("fs");

const getDirectory = (directory) => {
    const files = [];

    const dirPath = Server.path(directory);

    const dirFiles = fs.readdirSync(dirPath);

    for (let file of dirFiles) {
        files.push(file);
    }

    return files;
}

module.exports = getDirectory;