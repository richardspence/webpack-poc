var gulp = require('gulp');
var config = require('./config');

module.exports = () => {
    return gulp.src(module.exports.src)
        .pipe(gulp.dest(config.outputFolder));
};

module.exports.src = [
    'src/**/*.html'
];