var gulp = require('gulp');

// Runs sass task if any scss file changes and autoprefixer if global.css changes
gulp.task('watch', function() {
    gulp.watch([
		'app/scss/**/*.scss',
		'app/lib/bootstrap-sass/assets/stylesheets/**/*.scss'
	], ['sass']);
});
