var gulp = require('gulp');
var open = require('gulp-open');
var cors = require('cors');
var config = require('./config');

module.exports = function () {
    return gulp.src(__filename)
        .pipe(open({
            app: 'Chrome',
            middleware: () => [cors()],
            uri: config.uri
        }));
}

module.exports.dependencies = ['build', 'connect' ];