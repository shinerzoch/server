module.exports = async (port) => {
    await Server.Router.listen(port || 8080);
}