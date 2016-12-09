"use strict";
var collection = require('./customerCollection');
var CustomerRepository = (function () {
    function CustomerRepository() {
        this.fetch = function (key) {
            return (new collection.CustomerCollection());
        };
    }
    return CustomerRepository;
}());
exports.CustomerRepository = CustomerRepository;

//# sourceMappingURL=customerRepository.js.map
