var _ = require('lodash');
var {OriginalSource} = require("webpack-sources");
class ManifestPlugin {
    constructor() {
    }

    apply(compiler) {
        compiler.plugin("emit", (compilation, callback) => {
            var c= compiler;
            var files = compilation.entries.map(e => {
                const entry = {};
                const entryName = e.chunks[0].name
                entry[entryName] = e.dependencies
                    .map(d => d.module)
                    .filter(d=>d && d.chunks.filter(c=>c.entryModule === e).length)
                    .map(d => d.name || d.rawRequest);
                return entry;
            });
            var src = JSON.stringify(_.merge(...files));
            compilation.assets['manifest.json'] = new OriginalSource(src, 'manifest');
            callback();
        });
    }
}

module.exports = ManifestPlugin;
