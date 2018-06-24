var gulp = require('gulp'),
		gutil = require('gulp-util'),
		sass = require('gulp-sass'),
		postcss = require('gulp-postcss'),
		autoprefixer = require('autoprefixer'),
		uglify = require('gulp-uglify'),
		gulpif = require('gulp-if'),
		browserSync = require('browser-sync').create(),
		connect = require('gulp-connect-php'),
		sourcemaps = require('gulp-sourcemaps'),
		buffer = require('vinyl-buffer'),
		source = require('vinyl-source-stream'),
		browserify = require('browserify'),
		svgSprite = require('gulp-svg-sprites'),
		realFavicon = require('gulp-real-favicon'),
		fs = require('fs'),
		assetVersion = require('gulp-asset-versioning'),
		stripDebug = require('gulp-strip-debug');


var FAVICON_DATA_FILE = 'faviconData.json';
var PORT = 5080;
var jsSources = ['./src/js/main.js'];
var autoreload = true;

gulp.task('set-autoreload-off',function(){
	autoreload = false;
});

gulp.task('js', function() {
	var bundler = browserify(jsSources, {
			debug: true
		})
		.bundle()
		.on('error', function(e) {
			gutil.log(gutil.colors.red('========= ERROR JS ========'));
			gutil.log(e.toString());
			this.emit('end');
		});

	return bundler
		.pipe(source('script.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./template/js'))
		.pipe(gulpif(true, browserSync.stream()));
});

gulp.task('sass', function() {
	return gulp.src('./src/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.on('error', function(e) {
			gutil.log(gutil.colors.red('========= ERROR SASS ========'));
			gutil.log(e.toString());
			this.emit('end');
		})
		.pipe(postcss([autoprefixer({
			browsers: ['> 5%', '> 2% in IR', 'ie >= 9']
		})]))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./template/css'))
		.pipe(gulpif(true, browserSync.stream({
			match: "**/*.css"
		})));
});

gulp.task('connect', function() {
	return connect.server({
		port: 8001
	});
});

gulp.task('browser-sync', function() {
	return browserSync.init({
		proxy: 'localhost:8001',
		port: PORT,
		notify: true // set to false for no notifications
	});
});

gulp.task('asset-ver',function(){
	// main css versioning
	gulp.src('./fa/common/block.head.php')
		.pipe(assetVersion({
			assetPath: './template/css/main.css'
		}))
		.pipe(gulp.dest('./fa/common/'));

	// main javascript versioning
	gulp.src('./fa/common/block.js.php')
		.pipe(assetVersion({
			assetPath: './template/js/script.js'
		}))
		.pipe(gulp.dest('./fa/common/'));
});

// generate sprite.svg file
gulp.task('sprites', function() {
	return gulp.src('./src/svg/*.svg')
		.pipe(svgSprite({
			mode: "symbols",
			svgId: "svg_%f",
			preview: {
				sprite: false,
				symbols: false,
			},
			svg: {
				symbols: "sprite.svg"
			},
			transformData: function (data, config) {
		    data.svg.map(function(item) {
		      //change id attribute
		      item.data=item.data.replace(/id=\"([^\"]+)\"/gm, 'id="'+item.name+'-$1"');

		      //change id in fill attribute
		      item.data=item.data.replace(/fill=\"url\(\#([^\"]+)\)\"/gm, 'fill="url(#'+item.name+'-$1)"');

		      //change id in filter attribute
          item.data=item.data.replace(/filter=\"url\(\#([^\"]+)\)\"/gm, 'filter="url(#'+item.name+')"');

		      //change id in mask attribute
		      item.data=item.data.replace(/mask=\"url\(\#([^\"]+)\)\"/gm, 'mask="url(#'+item.name+'-$1)"');

		      //replace double id for the symbol tag
		      item.data=item.data.replace('id="'+item.name+'-'+item.name+'"', 'id="'+item.name+'"');
		      return item;
		    });
		    return data; // modify the data and return it
		  }
		}))
		.on('error', function(e) {
			gutil.log(gutil.colors.red('========= ERROR SPRITE ========'));
			gutil.log(e.toString());
			this.emit('end');
		})
		.pipe(gulp.dest("./template/images"))
		.pipe(gulpif(true, browserSync.stream()));
});

// generate favicon files in template/images/favicons
gulp.task('generate-favicon', function() {
	realFavicon.generateFavicon({
		masterPicture: 'src/favicon/favicon.svg',
		dest: 'template/images/favicons',
		iconsPath: '../template/images/favicons/',
		design: {
			ios: {
				pictureAspect: 'noChange',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#da532c',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#5bbad5'
			}
		},
		settings: {
			compression: 1,
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
	});
});
// inject the favicon markups in fa/common/block.favicon.php file
gulp.task('inject-favicon', ['generate-favicon'], function() {
	return gulp.src(['fa/common/block.favicon.php'])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('fa/common'));
});
/**
 * main favicon task
 * run this task manually once or use it in 'dist' task
 * after running its dependencies it will clone a copy of 'fa/common/block.favicon.php'
 * in 'en/common/' folder
 */
gulp.task('favicon', ['inject-favicon'], function() {
	return gulp.src('./fa/common/block.favicon.php')
		.pipe(gulp.dest('./en/common'));
});

// build tasks
gulp.task('build', ['sass', 'js', 'asset-ver'], function() {
	// minifiy script.js
	return gulp.src('./template/js/script.js')
		.pipe(stripDebug())
		.pipe(uglify())
		.on('error', function(e) {
			gutil.log(gutil.colors.red('========= ERROR BUILD ========'));
			gutil.log(e.toString());
			this.emit('end');
		})
		.pipe(gulp.dest('./template/js'));
});

gulp.task('default', ['connect','browser-sync', 'sass', 'js', 'sprites'], function() {
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/svg/**/*.svg', ['sprites']);
	gulp.watch(['index.php','fa/**/*.php','en/**/*.php'], {interval: 500}).on('change', browserSync.reload);
});

// serv task
gulp.task('serv', ['connect', 'browser-sync'], function() {
});

