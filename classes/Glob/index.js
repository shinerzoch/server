class Glob {}

Glob.getDeep = require('./functions/deepGet');
Glob.getDirectory = require('./functions/getDirectory');

Glob.glob = (dir) => {
    if (dir.endsWith('/**')) {
        dir = dir.replace('/**', '');
        return Glob.getDeep(dir);
    }

    else if (dir.endsWith('/*')) {
        dir = dir.replace('/*', '');
        return Glob.getDirectory(dir);
    }

    else {
        return [];
    }
}

module.exports = Glob;