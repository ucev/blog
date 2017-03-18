var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var pug = require("gulp-pug");
var sass = require("gulp-sass");

function reactCompile(opts, filename) {
  return browserify(filename, opts)
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle();
}

gulp.task("reactCompile", function() {
  process.env.NODE_ENV = 'production';
  return reactCompile({
      standalone: "MyStructs"
    }, "./src/js/my_struct.js")
    .pipe(source("my_structs.js"))
    .pipe(gulp.dest("./dist/js"));
})

gulp.task("scripts", ["reactCompile"], function() {
  var js_files = ["./dist/js/my_structs.js"];
  return gulp.src(js_files)
    .pipe(concat("my_structs.min.js"))
    .pipe(uglify())
    .pipe(buffer())
    .pipe(gulp.dest("./dist/js"))
    .pipe(rename("my_structs.min.js"))
    .pipe(buffer())
    .pipe(gulp.dest("./website/public/js"));
})

gulp.task("clientCompile", function() {
  process.env.NODE_ENV = 'production';
  return reactCompile({
    standalone: "MyStructs"
  }, "./src/js/client_struct.js")
  .pipe(source("client_struct.js"))
  .pipe(gulp.dest("./dist/js"));
})

gulp.task("client", ["clientCompile"], function() {
  var js_files = ["./dist/js/client_struct.js"];
  return gulp.src(js_files)
    .pipe(concat("client_struct.min.js"))
    .pipe(uglify())
    .pipe(buffer())
    .pipe(gulp.dest("./dist/js"))
    .pipe(rename("client_structs.min.js"))
    .pipe(buffer())
    .pipe(gulp.dest("./website/public/js"));
})

gulp.task("sass", function() {
  var css_files = ["./src/css/*.scss"];
  return gulp.src(css_files)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"));
})


//var watcher = gulp.watch(["./src/js/**/*.js"], ["scripts"])
//watcher.on("change", function() {
//  console.log("change");
//})