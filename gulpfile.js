'use strict';

var gulp       = require('gulp'),
    util       = require('gulp-util'),
    minify     = require('gulp-minify-css'),
    rename     = require('gulp-rename'),
    animations = require('./');

gulp.task('css', function() {
  animations.gulp
    .src({
      minify: false,
      autoprefixer: true
    })
    .pipe(gulp.dest('.'))
    .pipe(rename(animations.file.replace('.css', '.min.css')))
    .pipe(minify())
    .pipe(gulp.dest('.'));
});
gulp.task('css:watch', ['css'], function(){
  gulp.watch(['css/**/*.scss'], ['css']);
});


/**
Development server and livereload for the sample app
*/
var opnr      = require('open'),
    connect   = require('gulp-connect'),
    fs        = require('fs'),
    atomicity = require('atomicity.css'),
    port      = 4444;

gulp.task('server', function() {
  connect.server({
    root: './',
    port: port,
    livereload: { port: port + 1 }
  });
  opnr('http://localhost:' + port);
});

gulp.task('css:dev', function(){
  if (!fs.existsSync('./dist')){
    fs.mkdirSync('./dist');
  }
  atomicity.gulp.src({autoprefixer:true})
    .pipe(animations.gulp.through({autoprefixer:true}))
    .pipe(gulp.dest('dist/'));
});
gulp.task('css:dev:watch', ['css:dev'], function(){
  gulp.watch(['css/**/*.scss'], ['css']);
});

gulp.task('watch', ['css:dev:watch','server'], function(){
  gulp.watch(
    ['./*.html', './dist/*.css'],
    function(event){
      util.log('file changed:', util.colors.green(event.path));
      gulp.src(event.path)
        .pipe(connect.reload());
    });
});