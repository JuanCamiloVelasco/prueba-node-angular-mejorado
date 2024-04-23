"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = exports.EventSchema = void 0;
var mongoose_1 = require("mongoose");
exports.EventSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    fecha: { type: Date, required: true },
    descripcion: { type: String, required: true },
    tipo: { type: String, required: true }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
exports.EventModel = (0, mongoose_1.model)('EventLogs', exports.EventSchema);
