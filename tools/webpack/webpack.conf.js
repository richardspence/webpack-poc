var path = require('path');
var webpack = require('webpack');

const config = {
    context: path.resolve(__dirname, '../../dist'),
    entry: {
        app: './main',
        vendor: ['jquery']
    },
    output: {
        libraryTarget: 'amd',
        filename: '[name].bundle.js',
        umdNamedDefine: true,
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        modules: [path.resolve(__dirname, '../../vendor')],
        alias:{
            'jquery':'jquery/dist/jquery.min',
        }
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'] ,// Specify the common bundle's name.
            minChunkgs: Infinity,
        })
    ],
   
};

module.exports = config;