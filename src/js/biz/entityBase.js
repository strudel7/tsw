"use strict";
var EntityBase = (function () {
    function EntityBase(key) {
        var _this = this;
        this.toString = function () {
            return _this.key;
        };
        this._key = key;
    }
    Object.defineProperty(EntityBase.prototype, "key", {
        get: function () {
            return this._key;
        },
        enumerable: true,
        configurable: true
    });
    return EntityBase;
}());
exports.EntityBase = EntityBase;

//# sourceMappingURL=entityBase.js.map
