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
        vendor: ['jquery']
    },
    output: {
        libraryTarget: 'umd',
        filename: '[name].bundle.js',
        umdNamedDefine: true,
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        modules: [path.resolve(__dirname, '../../vendor')],
        alias: {
            'jquery': 'jquery/dist/jquery.min',
        }
    },
    plugins: [
        new PreserveModuleNamesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],// Specify the common bundle's name.
            minChunks: Infinity,
        }),
        new ManifestPlugin()
    ],

};

module.exports = config;