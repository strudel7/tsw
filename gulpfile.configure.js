'use strict';

let gulp = require('gulp'),
    gp = gulp.p = require('gulp-load-plugins')({ lazy: true });

gulp.p.yargs = require('yargs').argv;

// ------------------------------------------------------------------------------------------------
// Configuration state
// ------------------------------------------------------------------------------------------------
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

// ------------------------------------------------------------------------------------------------
// Utility Functions
// ------------------------------------------------------------------------------------------------
gulp.fn = { 
    src: function(blob, options) {
            return gulp.src(blob, options)
                       .pipe(gp.if(gulp.config.debug, gp.print()));
    },

    log: function(message) {
        let util = gp.util;

        if (typeof(message) !== 'object') {
            util.log(util.colors.blue(message));
            return;
        }

        for(let item in message) {
            if (!message.hasOwnProperty(item)) {
                continue;
            }

            util.log(util.colors.blue((item + ': ' + message[item])));
        }
    }
};

module.exports = gulp;