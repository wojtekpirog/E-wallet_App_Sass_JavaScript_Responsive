const { src, dest, series, watch } = require("gulp");
// CSS-related plugins
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require("cssnano");
// Rename
const rename = require("gulp-rename");
// Souce mapping
const sourcemaps = require("gulp-sourcemaps");

const paths = {
  styles: {
    src: "./src/scss/**/*.scss",
    dist: "./docs/css"
  }
}

function prepareCSS() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", (error) => {
      console.error(`Sass error: ${error}`);
    }))
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(rename({
      basename: "style",
      suffix: ".min",
      extname: ".css"
    }).on("error", (error) => {
      console.error(`Rename error: ${error}`);
    }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.styles.dist))
}

module.exports.prepareCSS = prepareCSS;