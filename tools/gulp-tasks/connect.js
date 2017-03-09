var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cors = require('cors');
module.exports = ()=>{
    browserSync.init({
        server:{
            baseDir:['./dist/', './vendor/'],
            middleware:[cors()]
        },
        open:false,
        port: 8000,
    })
}
