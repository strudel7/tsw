'use strict';

let gulp = require('./gulpfile.configure'),
    log = gulp.fn.log,
    gp = gulp.p;

// ------------------------------------------------------------------------------------------------
// Code Quality: JavaScript Hint and Style
// ------------------------------------------------------------------------------------------------
gulp.task('jcq-js-code-quality', function() {
    log('Running code quality reporting for JavaScript using JSCS and JSHint ...');
    
    return gulp.fn.src(gulp.config.directoryExpressions.javaScript)
                  .pipe(gp.jscs())
                  .pipe(gp.jshint())
                  .pipe(gp.jshint.reporter('jshint-stylish'), { verbose: true })
                  .pipe(gp.jshint.reporter('fail'));
});

// ------------------------------------------------------------------------------------------------
// Code Quality: TypeScript Lint
// ------------------------------------------------------------------------------------------------
gulp.task('tcq-ts-code-quality', function() {
    return gulp.src(gulp.config.directoryExpressions.typeScript)
               .pipe(gp.tslint())
               .pipe(gp.tslint.report('prose'));
});

// ------------------------------------------------------------------------------------------------
// Clean-Transpiled-Output
// ------------------------------------------------------------------------------------------------
gulp.task('clean', function() {
  var targetFiles = [ gulp.config.directories.transpileOutput ];   

  return gulp.fn.src(targetFiles, {read: false})
             .pipe(gp.rimraf());
});

// ------------------------------------------------------------------------------------------------
// Transpile (TS --> JS)
// ------------------------------------------------------------------------------------------------
gulp.task('transpile', ['clean'], function() {
    //let sourceTsFiles = [ gulp.config.allTypeScript,                // Path to typescript files
    //                      gulp.config.libraryTypeScriptDefinitions, // Reference to library .d.ts files
    //                     gulp.config.appTypeScriptReferences];     // Reference to app.d.ts files

    let tsFileExpressions = gulp.config.directoryExpressions.typeScript,
        transpileOutput = gulp.config.directories.transpileOutput;

    let compilerOptions = gulp.config.compilerOptions;
    let tsResult = gulp.fn.src(tsFileExpressions)
                          .pipe(gp.sourcemaps.init())
                          .pipe(gp.typescript(compilerOptions));

	return tsResult.js
                   .pipe(gp.sourcemaps.write('.'))
                   .pipe(gulp.dest(transpileOutput));

	// let tsResult = gulp.fn.src(typeScript)
    //                    .pipe(gp.sourcemaps.init())
    //                    .pipe(gp.typescript({
    //                        target: 'ES5',
    //                        jsx: 'react',
    //                        declarationFiles: false,
    //                        noResolve: true
    //                    }));

	// tsResult.dts.pipe(gulp.dest(outputDir));

	// return tsResult.js
    //                .pipe(gp.sourcemaps.write('.'))
    //                .pipe(gulp.dest(outputDir));
});


// ------------------------------------------------------------------------------------------------
// Browser-Sync
// ------------------------------------------------------------------------------------------------
gulp.task('browser-sync', function() {
    gp.browserSync.init({
        server: {
            baseDir: './',
            files: [ '*.html', 'css/*.css' ]
        }
    });
});

gulp.task('browser-watch', ['browser-sync'], function() {
    gulp.watch('*.html').on('change', gp.browserSync.reload);
});

// ------------------------------------------------------------------------------------------------
// Default
// ------------------------------------------------------------------------------------------------
gulp.task('default', ['lint', 'transpile', 'watch']);