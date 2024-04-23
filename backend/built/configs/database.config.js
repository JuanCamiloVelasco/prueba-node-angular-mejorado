"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bdConnnect = void 0;
var mongoose_1 = require("mongoose");
var bdConnnect = function () {
    (0, mongoose_1.connect)(process.env.MONGO_URI, {}).then(function () { return console.log('Conexion exitosa!'); }, function (error) { return console.log(error); });
};
exports.bdConnnect = bdConnnect;
exports.default = exports.bdConnnect;
