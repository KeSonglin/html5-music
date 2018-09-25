var gulp = require("gulp");
// 图片压缩
var imagemin = require("gulp-imagemin");
// HTML压缩
var htmlclean = require("gulp-htmlclean");
// js压缩
var uglify = require("gulp-uglify");
// 删去js中的debugger和console.log
var stripDebug = require("gulp-strip-debug");

// Reorder by dependencies
var deporder = require("gulp-deporder");
// 将多个js文件合并
var concat = require("gulp-concat");

// 将less文件编译成css文件
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");

// 开启前端服务
var connect = require("gulp-connect");

var folder = {
    src: "src/",
    dist: "dist/"
};

console.log(process.env.NODE_ENV);
var devMode = process.env.NODE_ENV !== "production";

//流操作 task running
gulp.task("css", function () {
    var css = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less());
    var options = [autoprefixer()];
    if (!devMode) {
        options.push(cssnano())
    }
    css.pipe(postcss(options))
        .pipe(gulp.dest(folder.dist + "css/"))
});
gulp.task("html", function () {
    var page = gulp.src(folder.src + "html/index.html")
        .pipe(connect.reload());
    if (!devMode) {
        page.pipe(htmlclean());
    }
    page.pipe(gulp.dest(folder.dist + "html/"))
});
gulp.task("images", function () {
    gulp.src(folder.src + "images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "images/"))
});
gulp.task("js", function () {
    var js = gulp.src(folder.src + "js/*")
        .pipe(connect.reload());
    if (!devMode) {
        js.pipe(uglify())
            .pipe(stripDebug())
            // .pipe(deporder())
            // .pipe(concat('app.all.js'))
    }
    js.pipe(gulp.dest(folder.dist + "js/"))
});

gulp.task("watch", function () {
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "html/*", ["html"]);
    gulp.watch(folder.src + "images/*", ["images"]);
    gulp.watch(folder.src + "js/*", ["js"]);
});

gulp.task("server", function () {
    connect.server({
        port: "8081",
        livereload: true 
    });
});

gulp.task("default", ["html", "images", "js", "css", "watch", "server"]);