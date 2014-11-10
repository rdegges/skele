var bower = require('gulp-bower');
var gulp = require('gulp');
var liveReload = require('gulp-livereload');
var stylus = require('gulp-stylus');

var DEV_MODE = (process.env.NODE_ENV || 'development') === 'development';

/**
 * Compile all of our Stylus CSS templates into proper CSS files.
 *
 * If this app is in development mode, CSS will be pretty-printed -- otherwise,
 * CSS will be compressed.
 */
gulp.task('css', function() {
  gulp.src('./assets/css/*.styl')
    .pipe(stylus({ compress: !DEV_MODE }))
    .pipe(gulp.dest('./assets/css/'));
});

/**
 * Copy all bower components into our asset path.
 */
gulp.task('bower', function() {
  bower()
    .pipe(gulp.dest('./assets/bower'));
});
