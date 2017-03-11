var gulp = require('gulp');
var config = require('./config');
var replace = require('gulp-token-replace');

module.exports = () => {
    var bundleManifest = require('../../'+config.outputFolder+'/manifest.json');
    return gulp.src([config.outputFolder + '/index.js'])
        .pipe(replace({
            global: {
                buildBundles: JSON.stringify(bundleManifest)
            },
            prefix: '__$',
            suffix: '$__'
        }))
        .pipe(gulp.dest(config.outputFolder))

}

module.exports.dependencies = ['opt'];