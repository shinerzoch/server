module.exports = async (package, options) => {
    if (typeof package.install === "function") {
        await package.install(options)
    }
}