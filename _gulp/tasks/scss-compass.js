/**
 * SCSS compiler
 * Compiles SCSS files into CSS.
 */
var compass = require('gulp-compass');
var rename = require("gulp-rename");

module.exports = function (gulp) {
    'use strict';
    gulp
        .src([
            'src/main.scss'
        ])
        .pipe(compass({
            style: 'expanded', //nested, expanded, compact, or compressed
            comments: false, //show comments or not
            css: 'client/dist/css', //target dir
            sass: 'client/src', //source sass/scss files dir
            logging: true,
            time: true
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename('dist/ngFormValidator.css'));
};
