'use strict';

let gulp = require('./gulp-func'),
    gp = gulp.p;

// ------------------------------------------------------------------------------------------------
// Code Quality: JavaScript Hint and Style
// ------------------------------------------------------------------------------------------------
gulp.task('jcq-js-code-quality', function() {
    gulp.p.util.log('Running code quality reporting for JavaScript using JSCS and JSHint ...');
    
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
gulp.task('clean-transpile-output', function() {
  var targetFiles = [ gulp.config.directories.transpileOutput ];   

  return gulp.fn.src(targetFiles, {read: false})
             .pipe(gp.rimraf());
});

// ------------------------------------------------------------------------------------------------
// Transpile (TS --> JS)
// ------------------------------------------------------------------------------------------------
gulp.task('transpile', ['clean-transpile-output'], function() {
    //let sourceTsFiles = [ gulp.config.allTypeScript,                // Path to typescript files
    //                      gulp.config.libraryTypeScriptDefinitions, // Reference to library .d.ts files
    //                     gulp.config.appTypeScriptReferences];     // Reference to app.d.ts files

    let typeScript = gulp.config.directoryExpressions.typeScript,
        outputDir = gulp.config.directories.transpileOutput;

	let tsResult = gulp.fn.src(typeScript)
                       .pipe(gp.sourcemaps.init())
                       .pipe(gp.tsc({
                           target: 'ES5',
                           jsx: 'react',
                           declarationFiles: false,
                           noExternalResolve: true
                       }));

	tsResult.dts.pipe(gulp.dest(outputDir));

	return tsResult.js
                   .pipe(gp.sourcemaps.write('.'))
                   .pipe(gulp.dest(outputDir));
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