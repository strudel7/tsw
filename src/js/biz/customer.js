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

//# sourceMappingURL=customer.js.map
