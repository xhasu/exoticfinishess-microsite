var gulp = require('gulp');
var browser = require('browser-sync').create();
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

const paths = {
	main: 'scss/main.scss',
	html: ['**/*.html'],
	scss: ['scss/**/*.scss'],
	js: ['js/**/*.js'],
	css: ['css/'],
};

function application(done){

	gulp.src(paths.main)
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer({cascade: false }))
		.pipe(cleanCss({keepBreaks: true}))
		.pipe(rename('application.min.css'))
		.pipe(gulp.dest(paths.css[0]))
		.pipe(browser.stream());

	done();
};


function deploy(done) {

	browser.init({server: '.', open: false, port: 4000, notify: false});

	gulp.watch(paths.scss, application);
	gulp.watch(paths.html).on('change', browser.reload);
	gulp.watch(paths.js).on('change', browser.reload);

	done();
};

gulp.task('default', gulp.series(application, deploy));