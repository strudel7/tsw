"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base = require('./entityBase');
var Customer = (function (_super) {
    __extends(Customer, _super);
    function Customer(key) {
        _super.call(this, key);
    }
    return Customer;
}(base.EntityBase));
exports.Customer = Customer;
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

//# sourceMappingURL=customer.js.map
