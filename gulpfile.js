var  gulp = require('gulp');
var  watch = require('gulp-watch');
var  prefixer = require('gulp-autoprefixer');
//var  uglify = require('gulp-uglify');
var  sourcemaps = require('gulp-sourcemaps');
var  cssmin = require('gulp-clean-css');
var  imagemin = require('gulp-imagemin');
var  pngquant = require('imagemin-pngquant');
var  browserSync = require("browser-sync");
var  rigger = require('gulp-rigger');
var  reload = browserSync.reload;
var  rimraf = require('rimraf');
var plumber = require('gulp-plumber');
var sequence = require('gulp-sequence');
var less = require('gulp-less');
var concat = require('gulp-concat');
var ignore = require('gulp-ignore');

var path = {
  build: {
    //Адреса куда ложить файлы сборки
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/',
    cssVendor:'build/css/vendor/',
    plugins: 'build/plugins/',
    files: 'build/download/'
  },
  src: {
    //Откуда брать исходники
    html: 'src/*.html',
    js: ['src/js/*.js', 'src/components/**/*.js'],
    css: ['src/style/main.less', 'src/font-awesome-4.7.0/css/font-awesome.min.css'],
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    cssVendor: 'src/style/vendor/*.css',
    plugins: "src/plugins/**/*.*",
    files: "src/download/**/*.*"
  },
  watch: {
    //За изменениями каких файлов мы хотим наблюдать
    html: 'src/**/*.html',
    js: 'src/**/*.js',
    css: 'src/**/*.less',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    plugins: 'src/plugins/**/*.*',
    files: 'src/download/**/*.*'
  },
  clean: './build'
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "Laplandin"
};

gulp.task('html:build', function() {
  gulp.src(path.src.html) //выбор фалов по нужному пути
    .pipe(rigger()) //вставляет код файла вместо указанного к файлу пути
    .pipe(gulp.dest(path.build.html)) //папка назначения
    .pipe(reload({stream:true})); //Перезагрузка сервера
});

var condition = '.src/plugins/**/*.js';
gulp.task('js:build', function() {
  gulp.src(path.src.js)
    //.pipe(rigger())
    //.pipe(sourcemaps.init()) //Инициируем sourcemap
    //.pipe(uglify()) //Сжимаем js
    //.pipe(sourcemaps.write()) //Прописываем карты
    //   .pipe(ignore.exclude(condition))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream:true}));
});

gulp.task('css:build', function() {
  gulp.src(path.src.css)
    .pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(less())
    .pipe(prefixer())
    // .pipe(cssmin({compatibility: 'ie10'}))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream:true}));
});

gulp.task('cssVendor', function() {
  gulp.src(path.src.cssVendor)
    .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img) //Выберем наши картинки
    // .pipe(imagemin({ //Сожмем их
    //   progressive: true,
    //   svgoPlugins: [{removeViewBox: false}],
    //   use: [pngquant()],
    //   interlaced: true
    // }))
    .pipe(gulp.dest(path.build.img)) //И бросим в build
   .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('plugins:copy', function() {
  gulp.src(path.src.plugins)
    .pipe(gulp.dest(path.build.plugins))
    .pipe(reload({stream: true}));
});

gulp.task('files:copy', function() {
  gulp.src(path.src.files)
    .pipe(gulp.dest(path.build.files))
    .pipe(reload({stream: true}));
});

gulp.task('build', sequence([
      'clean'
    ],
    [
      'html:build',
      'js:build',
      'css:build',
      'cssVendor',
      'fonts:build',
      'image:build',
      'plugins:copy'
      // 'files:copy'
]) );

gulp.task('watch', function() {
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.css], function(event, cb) {
    gulp.start('css:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
  watch([path.watch.plugins], function(event, cb) {
    gulp.start('plugins:copy');
  });
  watch([path.watch.files], function(event, cb) {
    gulp.start('files:copy');
  });
});

gulp.task('webserver', function() {
  browserSync(config);
});

gulp.task('clean', function(cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', sequence(['build'], ['webserver'], 'watch') );
