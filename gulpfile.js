//переменные
let gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer');

//Удаление папки dist
gulp.task('clean', async function () {
  del.sync('dist')
})

//Все файлы минифицируются, добавляются префексы, добавляется суффикс, и переносится в папку css, обновляет страницу
gulp.task('scss', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions'],
      cascade: false
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }))
});

//находит .css библиотек, обьеденяет в scss, перемещает в папку scss, перезагружает страницу
gulp.task('css', function () {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',

  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({ stream: true }))
});

//находит .html и обновляет страницу
gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

//находит .js и обновляет страницу
gulp.task('script', function () {
  return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({ stream: true }))
});

//находит .js библиотек и обьеденияе в 1, минифицирует, переносит в папку, перезапускает сервер
gulp.task('js', function () {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }))
});

//создает сервер
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

// находит все проэктные файлы и переносит их в конечную папку
gulp.task('export', function () {
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let BuildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  let BuildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));

  let BuildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

  let BuildImg = gulp.src('app/image/**/*.*')
    .pipe(gulp.dest('dist/image'));
});

//следит за изменениями в файлах
gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});

//удаляет папку и переносит содержимое
gulp.task('build', gulp.series('clean', 'export'));

//выполняет таски 
gulp.task('default', gulp.parallel('css', 'scss', 'html', 'js', 'browser-sync', 'watch'));