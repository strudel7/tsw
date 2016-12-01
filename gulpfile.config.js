'use strict';

var GulpConfig = (function() {
    function GulpConfig() {
        let directories = this.directories = {
        };

        let directoryExpressions = this.directoryExpressions = {
        };

        directories.root = './';
        directories.src = (directories.root + 'src/');
        directories.tools = (directories.src + 'tools/');
        directories.typings = (directories.tools + 'typings/');
        directories.transpileOutput = (directories.src + 'js/');

        directoryExpressions.javaScript = [ (directories.srcDirectory + '**/*.js'), (directories.root + '*.js') ];
        directoryExpressions.typeScript = [ (directories.srcDirectory + '**/*.ts'), (directories.srcDirectory + '**/*.tsx') ];



        //directories.typings = directories.srcDirectory + '/tools/typings/';
        //directories.libraryTypeScriptDefinitions = directories.typings + '**/*.ts';
        //directories.appTypeScriptReferences = directories.typings + 'typescriptApp.d.ts';
    }
    
    return GulpConfig;
})();

module.exports = (new GulpConfig());