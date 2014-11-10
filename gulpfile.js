var bower = require('gulp-bower');
var del = require('del');
var gulp = require('gulp');
var liveReload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
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
 * Wipe out all old Bower files.
 */
gulp.task('cleanBower', function(cb) {
  del(['./assets/bower'], { force: true }, cb);
});

/**
 * Copy all bower components into our asset path.
 */
gulp.task('bower', ['cleanBower'], function() {
  bower()
    .pipe(gulp.dest('./assets/bower'));
});

/**
 * Run our local development server, and watch for changes.
 */
gulp.task('run', ['bower', 'css'], function() {
  liveReload.listen();

  // If any new Bower components are installed -- copy them over into assets.
  gulp.watch('./bower_components/**', ['bower']);

  // If any Bower packages change, reload the live server.
  gulp.watch('./assets/bower/**').on('change', liveReload.changed);

  // If any stylus files are changed, recompile the CSS.
  gulp.watch('./assets/css/*.styl', ['css']).on('change', liveReload.changed);

  // If any JS files are changed, restart the Node server.
  nodemon({
    script: 'index.js',
    ext: 'js jade',
    ignore: ['gulpfile.js', 'node_modules/**', 'bower_components/**'],
    env: {
      NODE_ENV: process.env.NODE_ENV || 'development',
    },
  })
    .on('change', liveReload.changed)
    .on('restart', function() {
      console.log('Restarted!');
    });
});
