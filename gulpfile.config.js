'use strict';

let gulp = require('gulp'),
    gp = gulp.p = {
            gif: require('gulp-if'),
            util: require('gulp-util'),
            debug: require('gulp-debug'),
            prt: require('gulp-print'),
            inject: require('gulp-inject'),
            tsc: require('gulp-typescript'),
            tslint: require('gulp-tslint'),
            jshint: require('gulp-jshint'),
            jscs: require('gulp-jscs'),
            sourcemaps: require('gulp-sourcemaps'),
            rimraf: require('gulp-rimraf'),
            browserSync: require('browser-sync').create(),
            yargs:require('yargs').argv
        };


var GulpConfig = (function() {
    function GulpConfig() {
        this.debug = ((typeof(gp.yargs.verbose) === 'undefined') ? gp.yargs.verbose : false);

        let directories = this.directories = {
        };

        directories.root = './';
        directories.src = (directories.root + 'src/');
        directories.tools = (directories.src + 'tools/');
        directories.typings = (directories.tools + 'typings/');
        directories.transpileOutput = (directories.src + 'js/');

        let directoryExpressions = this.directoryExpressions = {
        };

        directoryExpressions.javaScript = [ (directories.srcDirectory + '**/*.js'), (directories.root + '*.js') ];
        directoryExpressions.typeScript = [ (directories.srcDirectory + '**/*.ts'), (directories.srcDirectory + '**/*.tsx') ];



        //directories.typings = directories.srcDirectory + '/tools/typings/';
        //directories.libraryTypeScriptDefinitions = directories.typings + '**/*.ts';
        //directories.appTypeScriptReferences = directories.typings + 'typescriptApp.d.ts';
    }
    
    return GulpConfig;
})();

gulp.config = (new GulpConfig());
module.exports = gulp;