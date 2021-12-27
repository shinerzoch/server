const fs = require("fs");

const getDirectory = (directory) => {
    const walk = function(dir, oldPath = "") {
        const dirPath = Server.path(directory + oldPath);

        let results = [];
        const list = fs.readdirSync(dirPath);

        list.forEach(function(file) {
            const fullPath = dirPath + '/' + file;

            const stat = fs.statSync(fullPath);
            if (stat && stat.isDirectory()) {
                /* Recurse into a subdirectory */
                results = results.concat(walk(file, oldPath + '/' + file));
            } else {
                /* Is a file */
                results.push(oldPath + '/' + file);
            }
        });
        return results;
    }

    return walk(directory);
}

module.exports = getDirectory;