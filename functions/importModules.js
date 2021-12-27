module.exports = async () => {
    console.log("[ server ]:", "Checking modules...");

    if (Server._config.DATABASE_ENABLED) {
        const database = require('../modules/database');
        Server.db = await database.installer();
    }

    else {
        console.log("[ module ][", "database", "]:", "Not Enabled");
    }

    const moduleFiles = Server.glob('_server/modules/*');

    for (let moduleName of moduleFiles) {
        let importedModule;

        try {
            importedModule = require('../modules/' + moduleName);
        }

        catch (err) {
            console.error("[ module ][", moduleName, "]:", "Could Not Import!");
        }

        if (importedModule) {
            const enabledName = moduleName.toUpperCase() + "_ENABLED";
            const isEnabled = (Server._config[enabledName]?.toLowerCase() === "true");

            if (moduleName === 'database') {}

            else if (!isEnabled) {
                console.log("[ module ][", moduleName, "]:", "Not Enabled")
            }

            else if (typeof importedModule.installer === "function") {
                try {
                    console.log("[ module ][", moduleName, "]:", "Installing...");
                    await importedModule.installer();
                    Server[moduleName] = importedModule;
                    console.log("[ module ][", moduleName, "]:", "Installed")
                }
                catch {
                    console.log("[ module ][", moduleName, "]:", "Error while installing!")
                }
            }

            else {
                console.log("[ module ][", moduleName, "]:", "Not init function!")
            }
        }
    }
}