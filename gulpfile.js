var   gulp     = require('gulp')
    , gutil    = require('gulp-util')
    , jshint   = require('gulp-jshint')
    , stylish  = require('jshint-stylish')
    , clean    = require('gulp-clean')
    , concat   = require('gulp-concat')
    , uglify   = require('gulp-uglify')
    , rename   = require('gulp-rename')
    , minify   = require('gulp-minify-css')
    , bower    = require('gulp-bower');

var filename = {};
filename.vendor = 'vendor';
filename.custom = 'custom';

var bases = {};
bases.dist = 'public/dist/';
bases.fonts = 'public/fonts/';

var files = {};
files.backend = ['*.js', 'routes/*.js'];

files.vendor = {};
files.vendor.javascript = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-select2/src/select2.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/underscore/underscore.js',
    'bower_components/momentjs/moment.js',
    'bower_components/modernizr/modernizr.js',
    'bower_components/foundation/js/foundation.js',
];
files.vendor.css = [
    'bower_components/foundation/css/foundation.css',
    'bower_components/font-awesome/css/font-awesome.css'
];
files.vendor.fonts = [
    'bower_components/font-awesome/fonts/*',
];

gulp.task('dist-clean', function() {

    gulp.src(bases.fonts, {read: false})
        .pipe(clean());

    gulp.src(bases.dist, {read: false})
        .pipe(clean());
});

gulp.task('vendor', ['dist-clean'], function() {
    gulp.src(files.vendor.javascript)
        .pipe(concat(filename.vendor + '.js'))
        .pipe(gulp.dest(bases.dist))
        .pipe(uglify())
        .pipe(rename(filename.vendor + '.min.js'))
        .pipe(gulp.dest(bases.dist))
        .on('error', gutil.log);

    gulp.src(files.vendor.css)
        .pipe(concat(filename.vendor + '.css'))
        .pipe(gulp.dest(bases.dist))
        .pipe(rename(filename.vendor + '.min.css'))
        .pipe(minify())
        .pipe(gulp.dest(bases.dist))
        .on('error', gutil.log);

    gulp.src(files.vendor.fonts)
        .pipe(gulp.dest(bases.fonts));
});

gulp.task('lint', function () {
    gulp.src(files.backend)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['bower'], function() {
    gulp.start('lint', 'dist-clean', 'vendor');
});

gulp.task('bower', function() {
    return bower();
});