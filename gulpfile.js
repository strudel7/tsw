'use strict';

let gulp = require('gulp'),
    util = require('gulp-util'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    sourcemaps = require('gulp-sourcemaps'),
    rimraf = require('gulp-rimraf'),
    browserSync = require('browser-sync').create();

let gulpConfig = require('./gulpfile.config');

// ------------------------------------------------------------------------------------------------
// Code Quality: JavaScript Hint and Style
// ------------------------------------------------------------------------------------------------
gulp.task('js-code-quality', function() {
    return gulp.src(gulpConfig.directoryExpressions.javaScript)
                .pipe(jscs())
                .pipe(jshint())
                .pipe(jshint.reporter('jshint-stylish'), { verbose: true });
});

// ------------------------------------------------------------------------------------------------
// Code Quality: TypeScript Lint
// ------------------------------------------------------------------------------------------------
gulp.task('ts-code-quality', function() {
    return gulp.src(gulpConfig.directoryExpressions.typeScript)
               .pipe(tslint())
               .pipe(tslint.report('prose'));
});

// ------------------------------------------------------------------------------------------------
// Clean-Transpiled-Output
// ------------------------------------------------------------------------------------------------
gulp.task('clean-transpile-output', function() {
  var targetFiles = [ gulpConfig.directories.transpileOutput ];   

  return gulp.src(targetFiles, {read: false})
             .pipe(debug())
             .pipe(rimraf());
});

// ------------------------------------------------------------------------------------------------
// Transpile (TS --> JS)
// ------------------------------------------------------------------------------------------------
gulp.task('transpile', ['clean-transpile'], function() {
    //let sourceTsFiles = [ gulpConfig.allTypeScript,                // Path to typescript files
    //                      gulpConfig.libraryTypeScriptDefinitions, // Reference to library .d.ts files
    //                     gulpConfig.appTypeScriptReferences];     // Reference to app.d.ts files

    let typeScript = gulpConfig.directoryExpressions.typeScript;

	let tsResult = gulp.src(typeScript)
                       .pipe(debug())
                       .pipe(sourcemaps.init())
                       .pipe(tsc({
                           target: 'ES5',
                           jsx: 'react',
                           declarationFiles: false,
                           noExternalResolve: true
                       }));

	tsResult.dts.pipe(gulp.dest(gulpConfig.transpileOutput));

	return tsResult.js
                   .pipe(sourcemaps.write('.'))
                   .pipe(gulp.dest(gulpConfig.transpileOutput));
});


// ------------------------------------------------------------------------------------------------
// Browser-Sync
// ------------------------------------------------------------------------------------------------
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './',
            files: [ '*.html', 'css/*.css' ]
        }
    });
});

gulp.task('browser-watch', ['browser-sync'], function() {
    gulp.watch('*.html').on('change', browserSync.reload);
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
};

// ------------------------------------------------------------------------------------------------
// Default
// ------------------------------------------------------------------------------------------------
gulp.task('default', ['lint', 'transpile', 'watch']);