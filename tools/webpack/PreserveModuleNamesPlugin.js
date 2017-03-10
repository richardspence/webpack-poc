class PreserveModuleNamesPlugin {
    constructor() {
    }

    apply(compiler) {
        compiler.plugin("compilation", (compilation) => {
            compilation.plugin("before-module-ids", (modules) => {
                modules.forEach((module) => {

                    if (module.id === null && module.libIdent) {
                        if (/vendor/.test(module.context)) {
                            module.id = module.rawRequest;
                        } else {
                            module.id = module.libIdent({
                                context: compiler.options.context
                            });
                        }
                    }
                });
            });
        });
    }
}

module.exports = PreserveModuleNamesPlugin;
