var _ = require('lodash');
var { OriginalSource } = require("webpack-sources");
class ManifestPlugin {
    constructor(options) {
        this._options = options || {};
    }

    getDependentModules(module, visited) {
        if (module && !_.includes(visited, module)) {
            if (!visited) {
                visited = [];
            }
            visited.push(module);
            const children = _.flattenDeep(module.dependencies
                .map(d => this.getDependentModules(d.module, visited))
                .filter(m => m));
            //add ourselves
            children.push(module);
            const nodeModule = /node_modules/;

            return children;//.filter(p=>!nodeModule.test(p.id) && !Number.isInteger(p.id));
        }
        return undefined;
    }

    processName(moduleName) {
        const keys = _.reduce(_.keys(this._options), (p, c) => `${c}|${p}`);
        const loaderRegex = new RegExp(`.*(${keys}).*!(.+)`);
        const stripPrefix = n => /^(\.\/)?(.+?)(\.js)?$/.exec(n)[2];
        const loaderMatch = loaderRegex.exec(moduleName);
        if (loaderRegex.test(moduleName)) {
            const key = loaderMatch[1];
            const mName = stripPrefix(loaderMatch[2]);
            const mappedKey = this._options[key];
            return `${mappedKey}!${mName}`;
        }
        return stripPrefix(moduleName);
    }

    apply(compiler) {
        compiler.plugin("emit", (compilation, callback) => {
            var c = compiler;
            var files = compilation.entries.map(e => {
                const entry = {};
                const entryName = /(.+)\.js/.exec(e.chunks[0].files[0])[1];
                var origDependencyNames = this.getDependentModules(e)
                    .filter(d => d && d.chunks.filter(c => c.entryModule === e).length)
                    .map(d => d.id)
                    .map(m => this.processName(m));
                entry[entryName] = origDependencyNames;
                return entry;
            });
            var src = JSON.stringify(_.merge(...files), null, 4);
            compilation.assets['manifest.json'] = new OriginalSource(src, 'manifest');
            callback();
        });
    }
}

module.exports = ManifestPlugin;
