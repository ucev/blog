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


function reactCompile(opts) {
  return browserify("./src/js/my_struct.js", opts)
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle();
}

gulp.task("reactCompile", function() {
  return reactCompile({standalone: "MyStructs"})
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

var watcher = gulp.watch("./src/js/*.js", ["scripts"])
watcher.on("change", function() {
  console.log("change");
})