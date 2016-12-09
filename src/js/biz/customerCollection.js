"use strict";
var CustomerCollection = (function () {
    function CustomerCollection(entities) {
        var _this = this;
        this._entitesByKey = {};
        this._entitesByIndex = {};
        this.getByKey = function (key) {
            return _this._entitesByKey[key];
        };
        this.getByIndex = function (index) {
            return _this._entitesByIndex[index];
        };
        if (!entities) {
            return;
        }
        for (var i = 0; (i < entities.length); i++) {
            var val = entities[i];
            this._entitesByKey[val.key] = val;
            this._entitesByIndex[i] = val;
        }
    }
    return CustomerCollection;
}());
exports.CustomerCollection = CustomerCollection;

//# sourceMappingURL=customerCollection.js.map
