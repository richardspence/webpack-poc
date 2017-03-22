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
        vendor: ['jquery', 'react', 'lodash', 'react-dom'],
    },
    output: {
        libraryTarget: 'umd',
        filename: '[name].bundle.js',
        umdNamedDefine: true,
        path: path.resolve(__dirname, '../../dist')
    },
    resolve: {
        extensions: ['.js', '.html'],
        modules: ['../vendor', path.resolve(__dirname, '../../dist')],
        alias: {
            'jquery': 'jquery/dist/jquery',
            'lodash': 'lodash/dist/lodash',
            'react-dom$': 'react/react-dom',
            'react$': 'react/react-with-addons',
        }
    },
    resolveLoader: {
        alias: {
            'text': 'file-loader?emitFile=false',
        }
    },
    plugins: [
        new PreserveModuleNamesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],// Specify the common bundle's name.
            minChunks: Infinity
        }),
        new ManifestPlugin({ 'file-loader': 'text' })
    ],

};

module.exports = config;