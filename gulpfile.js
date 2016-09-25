var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var del = require('del');
var bs = require('browser-sync');
var webpack = require('webpack');
var gutil = require('gulp-util');
var webpackConfig = require('./webpack.config.js');
var historyApiFallback = require('connect-history-api-fallback');

gulp.task('webpack',function(callback){
// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	//run webpack
	webpack(myConfig, function(err, stats) {
        
		if(err) {
			throw new gutil.PluginError("webpack:build", err);
		}
		/*
		 gutil.log("[webpack:build]", stats.toString({
		 colors: true
		 }));*/
		bs.reload();
		callback();
	});
});


gulp.task('sass', function () {
	return gulp.src('./scss/style.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./app/css'))
	.pipe(bs.stream());
})


gulp.task('dev', function(){
    bs.init({server: {
                baseDir: './app/',
                index: 'index.html'
            }
        }); 
        
	gulp.watch(['component_src/**','./Browser.jsx'], ['webpack'])
	gulp.watch('scss/**/*.scss', ['sass']);
});