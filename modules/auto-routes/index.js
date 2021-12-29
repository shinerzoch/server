class AutoRoutes {};
AutoRoutes.name = "auto-routes";
AutoRoutes.enabled = false;

AutoRoutes.options = {
    path: "routes"
}

AutoRoutes.install = (options) => {
    options = { ...AutoRoutes.options, ...options };
    
    const routeFiles = $server.glob(options.path + '/**');

    for (let route of routeFiles) {
        route = route.replace('.js', '');

        const importedRoute = require($server.path(options.path) + route);

        if (route === '/index') {
            $server.router.route({
                method: importedRoute.method || 'GET',
                url: '/',
                handler: (req, res) => importedRoute(req, res),
                prefixTrailingSlash: "both"
            });
        }

        else if (route.endsWith('index')) {
            route = route.replace('/index', '');

            $server.router.route({
                method: importedRoute.method || 'GET',
                url: route,
                handler: (req, res) => importedRoute(req, res),
                prefixTrailingSlash: "both"
            });

            $server.router.route({
                method: importedRoute.method || 'GET',
                url: route + "/",
                handler: (req, res) => importedRoute(req, res),
                prefixTrailingSlash: "both"
            });
        }

        else {
            $server.router.route({
                method: importedRoute.method || 'GET',
                url: route,
                handler: (req, res) => importedRoute(req, res),
                prefixTrailingSlash: "both"
            });

            $server.router.route({
                method: importedRoute.method || 'GET',
                url: route + "/",
                handler: (req, res) => importedRoute(req, res),
                prefixTrailingSlash: "both"
            });
        }

        console.log('[ autoroutes ]: Created', route);
    }

    console.log('[ autoroutes ]: Created', routeFiles.length, "Routes in total.");
    AutoRoutes.enabled = true;
    console.log("[", "autoroutes", "]:", "Enabled");
    return true;
}

module.exports = AutoRoutes;