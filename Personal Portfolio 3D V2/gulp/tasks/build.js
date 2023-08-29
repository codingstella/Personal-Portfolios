var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

function build(cb) {
    runSequence(
        'clean',
        'sprite:svg',
        'svgo',
        'sass',
        'pug',
        'js',
        'copy',
        cb
    );
}

gulp.task('build', function(cb) {
    config.setEnv('production');
    config.logEnv();
    build(cb);
});

gulp.task('build:dev', function(cb) {
    config.setEnv('development');
    config.logEnv();
    build(cb);
});
