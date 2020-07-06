var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync');

gulp.task('sass',function(){
    return gulp.src('./src/scss/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});

gulp.task('minify-css',function(){
    return gulp.src('./src/css/style.css')
        .pipe(plumber())
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('browser-sync',function(){
    browserSync.init({
        server : {
            baseDir : './',
            index : 'index.html'
        }
    });
});

gulp.task('bs-reload',function(){
    browserSync.reload();
});

gulp.task('default',['sass','minify-css','browser-sync'],function(){
    gulp.watch('./src/scss/style.scss',['sass']);
    gulp.watch('./src/**/**/*.scss',['sass']);
    gulp.watch('./src/scss/object/component/*.scss',['sass']);
    gulp.watch('./src/scss/object/project/*.scss',['sass']);
    gulp.watch('./src/scss/object/utility/*.scss',['sass']);
    gulp.watch('./src/css/style.css',['minify-css','bs-reload']);
    gulp.watch('./index.html',['bs-reload']);
    gulp.watch('./dist/js/app.js',['bs-reload']);
});