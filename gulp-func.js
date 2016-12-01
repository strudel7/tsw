'use strict';

let gulp = require('./gulpfile.config'),
    gp = gulp.p;

gulp.fn = {};

gulp.fn.src = function(blob, options) {
    return gulp.src(blob, options)
               .pipe(gp.gif(gulp.config.debug, gp.prt()));
};

gulp.fn.log = function(message) {
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
};

module.exports = gulp;

