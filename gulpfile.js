var gulp = require('gulp');  
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');  
var refresh = require('gulp-livereload');  
var connect = require('gulp-connect');
var browserify = require('browserify');
var watchify = require('watchify');

gulp.task('watch', function() {
  watchify.args.debug = true;
  var bundler = watchify(browserify('./src/app.js', watchify.args));

  bundler.transform('browserify-shader')

  bundler.on('update', rebundle)

  function rebundle () {
    return bundler.bundle()
      // log errors if they happen
      .on('error', function(e) {
        console.log(e.message);
        this.end();
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./build'))
      .pipe(connect.reload())
  }

  return rebundle()
})

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('default', ['webserver', 'watch']);
