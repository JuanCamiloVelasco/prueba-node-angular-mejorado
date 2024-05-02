"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = exports.EventSchema = void 0;
var mongoose_1 = require("mongoose");
// Creo el Schema con sus respectivas condiciones para el control de errores desde el backend
exports.EventSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], minlength: [5, 'El nombre es muy corto!'] },
    fecha: { type: Date, required: [true, 'La fecha es obligatoria'] },
    descripcion: { type: String, required: [true, 'La descripcion es obligatoria'], minlength: [5, 'La descripcion es muy corta!'] },
    tipo: { type: String, required: [true, 'El tipo es obligatorio'] }
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
