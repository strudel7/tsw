'use strict';

var GulpConfig = (function() {
    function GulpConfig() {
        this.src = './src/';
        this.srcTypeScript = this.src + '';

        this.tsOutputPath = this.src + '/js';
        this.allJavaScript = [this.src + '/js/**/*.js'];
        this.allTypeScript = this.srcTypeScript + '/**/*.ts';

        this.typings = this.src + '/tools/typings/';
        this.libraryTypeScriptDefinitions = this.typings + '**/*.ts';
        this.appTypeScriptReferences = this.typings + 'typescriptApp.d.ts';
    }
    
    return GulpConfig;
})();

module.exports = GulpConfig;