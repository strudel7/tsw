'use strict';

let gulp = require('gulp'),
    util = require('gulp-util'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    rimraf = require('gulp-rimraf'),
    browserSync = require('browser-sync').create(),
    Config = require('./gulpfile.config');



let config = new Config();

// ------------------------------------------------------------------------------------------------
// Clean-Transpiled-Output
// ------------------------------------------------------------------------------------------------
gulp.task('clean-transpile-output', function() {
  var typeScriptGenFiles = [ config.tsOutputPath,                      // path to generated JS files
                             config.srcTypeScript + '**/*.js',         // path to all JS files auto gen'd by editor
                             config.srcTypeScript + '**/*.js.map' ];   // path to all sourcemap files auto gen'd by editor

  return gulp.src(typeScriptGenFiles, {read: false})
             .pipe(debug())
             .pipe(rimraf());
});

// ------------------------------------------------------------------------------------------------
// Code Quality: JavaScript Hint and Style
// ------------------------------------------------------------------------------------------------
gulp.task('js-code-quality', function() {
    return gulp.src([
                 './src/**/*.js',
                 './*.js'
                ])
                .pipe(jscs())
                .pipe(jshint())
                .pipe(jshint.reporter('jshint-stylish'), { verbose: true });
});

// ------------------------------------------------------------------------------------------------
// Code Quality: TypeScript Lint
// ------------------------------------------------------------------------------------------------
gulp.task('ts-code-quality', function() {
    return gulp.src(config.allTypeScript)
               .pipe(tslint())
               .pipe(tslint.report('prose'));
});

// ------------------------------------------------------------------------------------------------
// Transpile (TS --> JS)
// ------------------------------------------------------------------------------------------------
gulp.task('transpile', ['clean-transpile'], function() {
    let sourceTsFiles = [ config.allTypeScript,                // Path to typescript files
                          config.libraryTypeScriptDefinitions, // Reference to library .d.ts files
                          config.appTypeScriptReferences];     // Reference to app.d.ts files

	let tsResult = gulp.src(sourceTsFiles)
                       .pipe(debug())
                       .pipe(sourcemaps.init())
                       .pipe(tsc({
                           target: 'ES5',
                           jsx: 'react',
                           declarationFiles: false,
                           noExternalResolve: true
                       }));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));

        return tsResult.js
                       .pipe(sourcemaps.write('.'))
                       .pipe(gulp.dest(config.tsOutputPath));
});


// ------------------------------------------------------------------------------------------------
// Browser-Sync
// ------------------------------------------------------------------------------------------------
gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./",
            files: ["*.html", "css/*.css"]
        }
    });
});

gulp.task('browser-watch', ['browser-sync'], function() {
    gulp.watch("*.html").on('change', bs.reload);
});

// ------------------------------------------------------------------------------------------------
// Build Utility Functions
// ------------------------------------------------------------------------------------------------
let log = (message) => {
    if (typeof(message) !== 'object') {
        util.log(util.colors.blue(message));
        return;
    }

    for(let item in message) {
        if (!message.hasOwnProperty(item)) {
            continue;
        }

        log(message[item]);
    }
}

// ------------------------------------------------------------------------------------------------
// Default
// ------------------------------------------------------------------------------------------------
gulp.task('default', ['lint', 'transpile', 'watch']);