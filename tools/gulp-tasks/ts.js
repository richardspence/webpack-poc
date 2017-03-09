var config = require('./config');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var tsProject = ts.createProject('src/tsconfig.json');

module.exports = cb => {
    var errors = [];
    var tsResult = gulp.src(module.exports.src)
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .on('error', err => {
            errors.push(err);
        });

    merge(tsResult.js.pipe(sourcemaps.write())
        .pipe(gulp.dest(config.outputFolder)),
        tsResult.dts.pipe(gulp.dest(config.outputFolder))
    ).on('finish', () => {
        if (errors.length !== 0) {
            cb('TS errors');
        } else {
            cb();
        }
    })
};

module.exports.src = ['src/**/*.ts', 'src/**/*.tsx'];
