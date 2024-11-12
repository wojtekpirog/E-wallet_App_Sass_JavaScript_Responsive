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
// Webpack
const webpack = require("webpack-stream");
// BrowserSync
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

const paths = {
  styles: {
    src: "./src/scss/**/*.scss",
    dist: "./docs/css"
  },
  scripts: {
    src: "./src/js/main.js",
    dist: "./docs/js"
  },

  html: "./docs/index.html"
}

function prepareCSS() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", (error) => console.error(`An error occured while compiling sass: ${error.message}`)))
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(rename({
      basename: "style",
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.styles.dist))
}

// Webpack-stream configuration
function bundleJS() {
  return src(paths.scripts.src)
    .pipe(webpack({
      mode: "production",
      output: {
        filename: "bundle.min.js"
      },
      devtool: "source-map",
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/env"]
              }
            }
          },
        ]
      }
    }).on("error", (error) => console.error(`An error occured while bundling JS files: ${error.message}`)))
    .pipe(dest(paths.scripts.dist));
}

function startBrowserSync(callback) {
  browserSync.init(
    {
      host: "192.168.1.101",
      port: 3000,
      injectChanges: true,
      server: {
        baseDir: "./docs",
        index: "index.html"
      },
    }
  );

  callback();
}

function watchForChanges() {
  watch(paths.html).on("change", reload);
  watch(paths.styles.src).on("change", series(prepareCSS, reload));
  watch(paths.scripts.src).on("change", series(bundleJS, reload));
}

module.exports.default = series(prepareCSS, bundleJS, startBrowserSync, watchForChanges);