var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    KarmaServer = require('karma').Server;


gulp.task('jshint', function() {
  gulp.src('./angular-password.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'), {verbose: true})
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['jshint'], function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('dist', ['test'], function() {
  gulp.src('./angular-password.js')
    .pipe(uglify())
    .pipe(rename('angular-password.min.js'))
    .pipe(gulp.dest('./'));
});
