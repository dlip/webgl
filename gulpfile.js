var gulp = require('gulp');  
var browserify = require('gulp-browserify');  
var concat = require('gulp-concat');  
var refresh = require('gulp-livereload');  
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');

gulp.task('scripts', function() {  
    gulp.src(['src/**/*.js'])
        .pipe(plumber())
        .pipe(browserify())
        .pipe(concat('dest.js'))
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
})

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('default', function() {  
    gulp.run('webserver', 'scripts');

    gulp.watch('src/**', function(event) {
        gulp.run('scripts');
    });
})
