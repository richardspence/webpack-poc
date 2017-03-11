var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin')
var PreserveModuleNamesPlugin = require('./PreserveModuleNamesPlugin')
var assetsPluginInstance = new AssetsPlugin();
var ManifestPlugin = require('./ManifestPlugin');

const config = {
    context: path.resolve(__dirname, '../../dist'),

    entry: {
        app: './main',
        vendor: ['jquery', 'react', 'lodash', 'react-dom']
    },
    output: {
        libraryTarget: 'umd',
        filename: '[name].bundle.js',
        umdNamedDefine: true,
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        modules: [path.resolve(__dirname, '../../vendor'), path.resolve(__dirname, '../../dist')],
        alias: {
            'jquery': 'jquery/dist/jquery',
            'lodash': 'lodash/dist/lodash',
            'react-dom$': 'react/react-dom',
            'react$': 'react/react-with-addons',
        }
    },
    plugins: [
        new PreserveModuleNamesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],// Specify the common bundle's name.
            minChunks: (module)=> {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('vendor') !== -1;
            },
        }),
        new ManifestPlugin()
    ],

};

module.exports = config;