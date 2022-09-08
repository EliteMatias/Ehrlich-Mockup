var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    prefixer    = require('gulp-autoprefixer'),
    pxtorem     = require('gulp-pxtorem'),
    sourcemaps  = require('gulp-sourcemaps'),
    path        = require('path'),
    rename      = require('gulp-rename'),
    concat      = require('gulp-concat'),
    cssmin      = require('gulp-cssmin'),
    runSequence = require('run-sequence').use(gulp);

var stylesheets = [
  {
      src : 'resources/scss/main',
      name: 'main.min',
      type: 'global',
      dest: 'resources/css'
  }
];

gulp.task( "main-sass", function(done) {
  stylesheets.map(function(file) {
    var fileName = file.name + '.css',
      fileType = file.type,
      fileSrc  = fileType == "page" ? file.src : file.src + '.scss',
      fileDest = file.dest;
    return gulp.src([fileSrc])
    .pipe(sass().on( "error", sass.logError ))
    .pipe(prefixer( "last 2 versions" ))
    .pipe(rename(function (newfile) {
        if (fileType == "page") {
          let parentFolder = path.dirname(newfile.dirname)
          newfile.dirname  = path.join(parentFolder, 'pages');
        }
        if (fileType == "block") {
          let parentFolder = path.dirname(newfile.dirname)
          newfile.dirname = path.join(parentFolder, 'blocks');
        }
    }))
    .pipe( pxtorem( {
      rootValue:16,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing','padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'width', 'height','border','border-radius', 'border-width', 'border-top', 'border-left', 'border-right', 'border-bottom', 'max-width', 'min-width', 'left', 'top', 'bottom', 'right'],
    } ) )
    .pipe(cssmin())
    .pipe( sourcemaps.write("/") )
    .pipe( gulp.dest( fileDest ) )
  });
  done();
});

gulp.task( "watch", function() {
  gulp.watch( "resources/scss/**/*.scss", gulp.series(["main-sass"]) );
});