var gulp = require('gulp');
var config = require('./config');
var webpackConfig = require('../webpack/webpack.conf');
var webpack = require('webpack-stream');
var webpack2 = require('webpack');
var _ = require('lodash');
var sourcemaps = require('gulp-sourcemaps');

module.exports = () => {
    return gulp.src([config.outputFolder + '/main.js'])
        .pipe(webpack(webpackConfig, webpack2))
        .pipe(gulp.dest(config.outputFolder));
}

module.exports.dependencies = ['ts'];