const gulp = require("gulp"),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  minifyjs = require('gulp-js-minify'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  cssMinify = require('gulp-css-minify'),
  minify = require('gulp-minify');
  
sass.compiler = require('node-sass');

const paths = {
  html: './index.html',
  src: {
    scss: "./src/scss/**/*.scss",
    js: "./src/js/*.js",
    img: "./src/img/*"
  },
  dist: {
    css: "./dist/css/",
    js: "./dist/js/",
    img: "./dist/img/",
    self: "./dist/"
  }
};

/*** FUNCTIONS ***/

const buildJS = () => (
  gulp.src(paths.src.js)
  .pipe(minify())
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream())
);

const buildCSS = () => (
  gulp.src(paths.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer({cascade: false	}))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream())
);

const buildIMG = () => (
  gulp.src(paths.src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.img))
    .pipe(browserSync.stream())
);

const cleanBuild = () => (
  gulp.src(paths.dist.self, {allowEmpty: true})
    .pipe(clean())
);

const watcher = () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(paths.src.scss, buildCSS).on("change", browserSync.reload);
  gulp.watch(paths.src.js, buildJS).on("change", browserSync.reload);
  gulp.watch(paths.src.img, buildIMG).on("change", browserSync.reload);
  gulp.watch(paths.html).on("change", browserSync.reload);
};

const build = gulp.series(
  buildCSS,
  buildJS,
  buildIMG,
  watcher
);

/*** TASKS ***/
// gulp.task("clean", cleanBuild);
// gulp.task("buildCSS", buildCSS);
// gulp.task("buildJS", buildJS);

// gulp.task("default", gulp.series(cleanBuild, gulp.parallel(buildIMG, build)));


gulp.task("dev", gulp.series(buildCSS, buildJS, watcher, gulp.parallel(buildIMG)))
gulp.task("build", gulp.series(cleanBuild, buildCSS, buildJS, buildIMG ))