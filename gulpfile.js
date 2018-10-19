const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babelify = require('babelify');
const svgSprite = require('gulp-svg-sprites');
const realFavicon = require('gulp-real-favicon');
const fs = require('fs');
const stripDebug = require('gulp-strip-debug');
const runSequence = require('run-sequence');


const FAVICON_DATA_FILE = 'faviconData.json';
const PORT = 5080;

const SRC = {
	js: 'src/js/',
	sass: 'src/scss/',
	sprite: 'src/svg/',
	fonts: 'src/fonts/',
	images: 'src/images/',
	media: 'src/media/',
	favicon: 'src/favicon/favicon.svg',
};

const BUILD = {
	js: 'public/js',
	sass: 'public/css',
	sprite: 'public/images',
	fonts: 'public/fonts',
	images: 'public/images',
	media: 'public/media',
	favicon: 'public/images/favicons',
};

function onError(e) {
	gutil.log(gutil.colors.red('========= ERROR ========='));
	gutil.log(e.toString());
	this.emit('end');
}

gulp.task('js', function() {
	var bundler = browserify(`${SRC.js}main.js`, {
			debug: true
		})
		.transform(babelify, { presets: ["@babel/preset-env"] })
		.bundle()
		.on('error', onError);

	return bundler
		.pipe(source('script.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(BUILD.js))
		.pipe(gulpif(true, browserSync.stream()));
});

gulp.task('js-build', function() {
	return gulp.src(`${BUILD.js}/script.js`)
		.pipe(stripDebug())
		.pipe(uglify())
		.on('error', onError)
		.pipe(gulp.dest(BUILD.js));
});

gulp.task('sass', function() {
	return gulp.src(`${SRC.sass}main.scss`)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on('error', onError)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(BUILD.sass))
		.pipe(gulpif(true, browserSync.stream({
			match: "**/*.css"
		})));
});

gulp.task('sass-build', function() {
	return gulp.src(`${SRC.sass}main.scss`)
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.on('error', onError)
		.pipe(postcss([autoprefixer({
			browsers: ['> 5%', '> 2% in IR', 'ie >= 9']
		})]))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(BUILD.sass))
});

gulp.task('sprite', function() {
	return gulp.src(`${SRC.sprite}*.svg`)
		.pipe(svgSprite({
			mode: "symbols",
			svgId: "%f",
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
		.on('error', onError)
		.pipe(gulp.dest(BUILD.sprite))
		.pipe(gulpif(true, browserSync.stream()));
});

gulp.task('fonts', function () {
	return gulp.src(`${SRC.fonts}**/*`)
    .pipe(gulp.dest(`${BUILD.fonts}`))
});

gulp.task('images', function () {
	return gulp.src(`${SRC.images}**/*`)
    .pipe(gulp.dest(`${BUILD.images}`))
});

gulp.task('media', function () {
	return gulp.src(`${SRC.media}**/*`)
    .pipe(gulp.dest(`${BUILD.media}`))
});

gulp.task('browser-sync', function() {
	return browserSync.init({
		proxy: 'localhost/starters/starter-gulp-browserify-sass-php',
		port: PORT,
		notify: true // set to false for no notifications
	});
});

// generate favicon files in public/images/favicons
gulp.task('generate-favicon', function() {
	realFavicon.generateFavicon({
		masterPicture: SRC.favicon,
		dest: BUILD.favicon,
		iconsPath: '../public/images/favicons/',
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
// inject the favicon markups in php block
gulp.task('favicon', ['generate-favicon'], function() {
	return gulp.src('pages/common/favicon.php')
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('pages/common'));
});

gulp.task('all', ['fonts', 'images', 'media', 'sass', 'js', 'sprite']);

gulp.task('default', ['browser-sync', 'all'], function() {
	gulp.watch(`${SRC.sass}**/*.scss`, ['sass']);
	gulp.watch(`${SRC.js}**/*.js`, ['js']);
	gulp.watch(`${SRC.sprite}**/*.svg`, ['sprite']);
	gulp.watch(`${SRC.images}**/*`, { cwd:'./' }, ['images']);
	gulp.watch(`${SRC.media}**/*`, { cwd:'./' }, ['media']);
	gulp.watch('pages/**/*.php', {interval: 500}).on('change', browserSync.reload);
});

// build tasks
gulp.task('build', function() {
	runSequence('all', 'sass-build', 'js-build');
});

