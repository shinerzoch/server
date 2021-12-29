class Glob {
    constructor(server) {
        this.server = server
    }

    getDeep = require('./functions/deepGet');
    getDirectory = require('./functions/getDirectory');

    glob = (dir) => {
        if (dir.endsWith('/**')) {
            dir = dir.replace('/**', '');
            return this.getDeep(dir, this.server);
        }
    
        else if (dir.endsWith('/*')) {
            dir = dir.replace('/*', '');
            return this.getDirectory(dir, this.server);
        }
    
        else {
            return [];
        }
    }
}

module.exports = Glob;