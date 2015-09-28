var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    runSequence = require('run-sequence');

var riseError = function (err) {
    console.log(err.toString());
    this.emit('end');
};

// Compile scss files to css
gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            precision: 8
        }))
        .pipe(autoprefixer('> 1%'))
        .on('error', riseError)
        .pipe(gulp.dest('app/css'))
});

gulp.task('css', function () {
    runSequence(
        'sass'
    );
});
