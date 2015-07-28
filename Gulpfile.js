// Gulp e seus plugins
var gulp 		= require('gulp'),
	jshint 		= require('gulp-jshint'),
	uglify 		= require('gulp-uglify'),
	concat 		= require('gulp-concat'),
	rename 		= require('gulp-rename'),
    notify		= require("gulp-notify") 
    bower 		= require('gulp-bower'),
	sass 		= require('gulp-sass'),
	minifycss 	= require('gulp-minify-css'),
	browserSync = require('browser-sync').create(),
	reload      = browserSync.reload;
 
// Diretorio dos arquivos
var config = {
	scriptsPath : './assets/js',
	sassPath	: './assets/scss',
	bowerDir	: './assets/components'
}
var scripts_path = config.scriptsPath + "/*.js";
var scss_path    = config.sassPath + "/*.scss";

// Static Server + watching scss/js/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "."
    });

    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch(scss_path, ['sass']).on("change", browserSync.reload);
    gulp.watch(scripts_path, ['script']).on("change", browserSync.reload);
});

// Bower
gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

// Tarefa script
gulp.task('script', function() {
	return gulp.src(scripts_path)
	// lint
	.pipe(jshint()
		.on('error', function (err) {
	    	console.error('Error!', err.message);
	    }))

	// dist
	.pipe(concat('./dist/js'))
	.pipe(rename('main.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));
});

// Tarefas styles
gulp.task('sass', function() {
    return gulp.src(scss_path)
        .pipe(sass({
             style: 'compressed',
             loadPath: [
                 'assets/scss',
                 'assets/components/bootstrap-sass/assets/stylesheets'
             ]
         }) 
	    .on('error', function (err) {
	    	console.error('Error!', err.message);
	    }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});


// Handle the error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}


// ********************************
// Tarefa default para rodar o gulp
// ********************************
gulp.task('default', function() {
	// var run = ['sass', 'script', 'serve'];
	// var dist = ['dist'];
	// var sassTask = ['sass'];
	var serveTask = ['serve'];

	// gulp.watch(scss_path, ['sass']).on("change", browserSync.reload);
	// gulp.watch(scripts_path, ['script']).on("change", browserSync.reload);
});
