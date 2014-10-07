'use strict';

var gulp      = require('gulp'),
    util      = require('gulp-util'),
    minify    = require('gulp-minify-css'),
    rename    = require('gulp-rename'),
    atomicity = require('./');

gulp.task('css', function() {
  atomicity.gulp
    .src({
      minify: false,
      autoprefixer: true
    })
    .pipe(gulp.dest('.'))
    .pipe(rename(atomicity.file.replace('.css', '.min.css')))
    .pipe(minify())
    .pipe(gulp.dest('.'));
});
gulp.task('css:watch', ['css'], function(){
  gulp.watch(['css/**/*.scss'], ['css']);
});


/**
Development server and livereload for the sample app
*/
var opnr = require('open'),
    connect = require('gulp-connect'),
    port = 4444;

gulp.task('server', function() {
  connect.server({
    root: './',
    port: port,
    livereload: { port: port + 1 }
  });
  opnr('http://localhost:' + port);
});

gulp.task('watch', ['css:watch','server'], function(){
  gulp.watch(
    ['./*.html', 'css/*.scss'],
    function(event){
      util.log('file changed:', util.colors.green(event.path));
      gulp.src(event.path)
        .pipe(connect.reload());
    });
});