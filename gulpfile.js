// BrowserSync Base Dir
var baseDir = './';
var htmlPath = './**/*.html';

// Sass and Js Path
var sassPath = [
  './src/butterCake.scss'
];
var sassWatch = './src/**/*.scss';
// Dist Path
var sassDist = './dist/css';

// Javascript
var jsPath = [
  './dist/js/butterCake.js',
];
var jsWatch = './dist/js/**/*.js';
// Dist Path
var jsDist = './dist/js';


// Requires
var gulp = require("gulp");
var sass = require("gulp-sass");

var postcss = require("gulp-postcss");
var autoprefixer = require('autoprefixer');
// var postcssSass = require("postcss-sass");
var cssnano = require("cssnano");

var uglify = require("gulp-uglify");
var pipeline = require('readable-stream').pipeline;

var rename = require("gulp-rename");
var browser = require("browser-sync").create();

var concat = require('gulp-concat');
var babel = require('gulp-babel');


// Compile scss into css
function scss() {
  return gulp.src(sassPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(sassDist))
    .pipe(postcss([cssnano()]))
    .pipe(rename({
      dirname: '/min',
      suffix: '.min'
    }))
    .pipe(gulp.dest(sassDist))
    .pipe(browser.stream())
}

// Compile Latest js into es5 
function js() {
 return gulp.src(jsPath)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest(jsDist))
    .pipe(uglify())
    .pipe(rename({
      dirname: '/min',
      suffix: '.min'
    }))
    .pipe(gulp.dest(jsDist))
    .pipe(browser.stream())
}

// Concat all js into one
function concatjs() {
  return gulp.src(jsWatch)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('/compiled-all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDist))
}

// Watch Changes
function watch() {
  browser.init({
    server: {
      baseDir: baseDir
    }
  });
  gulp.watch(sassWatch, scss);
  gulp.watch(htmlPath).on('change', browser.reload);
  // gulp.watch(jsWatch, js);
  // gulp.watch(jsPath).on('change', browser.reload);;
}

exports.scss = scss;
exports.watch = watch;
exports.concat = concatjs;