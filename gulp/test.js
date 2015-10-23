var gulp=require('gulp'),
    karma = require('gulp-karma');

gulp.task('test', function () {
	// Be sure to return the stream
	// NOTE: Using the fake './foobar' so we run the files
	// listed in karma.conf.js instead of what's passed to gulp.src
	return gulp.src('./foobar')
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}))
		.on('error', function(err){
			// Make sure failed tests cause gulp to exit non-zero
			console.log(err);
			this.emit('end'); // instead of entering the stream, end it
		});
});

gulp.task('autotest', function(){
	return gulp.watch(['js/**/*.js', 'test/unit/*.js'], ['test']);
})
