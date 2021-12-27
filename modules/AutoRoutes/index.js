class AutoRoutes {}
AutoRoutes.enabled = false;

AutoRoutes.install = async (options = {}) => {
    console.log("[", "autoroutes", "]:", "Enabled");
    options.path = options.path? options.path: 'routes';

    const routeFiles = Server.glob(options.path + '/**');

    for (let route of routeFiles) {
        route = route.replace('.js', '');

        const importedRoute = require(Server.path(options.path) + route);

        if (route === '/index') {
            Server.Router.route({
                method: importedRoute.method || 'GET',
                url: '/',
                handler: importedRoute,
                prefixTrailingSlash: "both"
            });
        }

        else if (route.endsWith('index')) {
            route = route.replace('/index', '');

            Server.Router.route({
                method: importedRoute.method || 'GET',
                url: route,
                handler: importedRoute,
                prefixTrailingSlash: "both"
            });

            Server.Router.route({
                method: importedRoute.method || 'GET',
                url: route + "/",
                handler: importedRoute,
                prefixTrailingSlash: "both"
            });
        }

        else {
            Server.Router.route({
                method: importedRoute.method || 'GET',
                url: route,
                handler: importedRoute,
                prefixTrailingSlash: "both"
            });

            Server.Router.route({
                method: importedRoute.method || 'GET',
                url: route + "/",
                handler: importedRoute,
                prefixTrailingSlash: "both"
            });
        }

        console.log('[ autoroutes ]: Created', route);
    }

    console.log('[ autoroutes ]: Created', routeFiles.length, "Routes in total.");
    AutoRoutes.enabled = true;
    return true;
}

module.exports = AutoRoutes;