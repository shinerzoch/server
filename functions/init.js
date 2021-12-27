const importModules = require('./importModules');

module.exports = async () => {
    console.log("[ server ]:", "Initializing...");

    await importModules();
}