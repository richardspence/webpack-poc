var gulp = require('gulp');
var open = require('gulp-open');
var cors = require('cors');
var config = require('./config');
var assetsTask = require('./assets');
var tsTask = require('./ts');

module.exports = () => {
    var result = gulp.src(__filename)
        .pipe(open({
            app: 'Chrome',
            middleware: () => [cors()],
            uri: config.uri
        }));

    gulp.watch(assetsTask.src, ['assets']);
    gulp.watch(tsTask.src, ['ts']);
    return result;
}

module.exports.dependencies = ['build', 'connect'];