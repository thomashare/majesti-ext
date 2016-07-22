// Require all node modules
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var svgo = require('gulp-svgo');

// Static Server + watching styl/jade files
gulp.task("serve", ['pug', 'stylus', 'svgo', 'coffeescript'], function() {

  browserSync.init({
    
    server: {
      baseDir: "./",
      index: "pages/options.html",
      reloadDelay: 5000
    }
    
  });

  gulp.watch(["./templates/pages/*.pug", "./templates/pages/**/*.pug"]).on("change", browserSync.reload);
  gulp.watch("./static/styl/**/*.styl").on("change", browserSync.reload);
  gulp.watch("./static/coffee/**/*.coffee").on("change", browserSync.reload);
  gulp.watch("./static/styl/**/*.styl", ['stylus']);
  gulp.watch("./templates/**/*.pug", ['pug']);
  gulp.watch("./static/svg/**/*.svg");
  gulp.watch("./static/coffee/**/*.coffee", ['coffeescript']);
  gulp.watch("./static/svg/**/*.svg", ['svgo']);
  
});

// Convert pug files to html and move to the pages folder in the root directory
gulp.task("pug", function buildHTML() {
  
  return gulp.src('./templates/pages/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest("./pages"))
    .pipe(browserSync.stream());
  
});

// Compile styl into CSS
gulp.task("stylus", function() {
  
  return gulp.src("./static/styl/**/*.styl")
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest("./static/css"))
    .pipe(browserSync.stream());

});

// Optimize svg files
gulp.task("svgo", function() {
  
  return gulp.src("./static/svg/**/*.svg")
    .pipe(svgo())
    .pipe(gulp.dest('./static/svg'))
    .pipe(browserSync.stream());
  
});

// Convert coffee files to js files
gulp.task("coffeescript", function() {
  
  return gulp.src("./static/coffee/**/*.coffee")
    .pipe(coffee())
    .pipe(uglify())
    .pipe(gulp.dest("./static/js"))
    .pipe(browserSync.stream());
  
});

gulp.task('default', ['serve']);