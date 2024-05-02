import { Schema, model } from "mongoose";

export interface EventLogs{
    id:string;
    nombre:string;
    fecha:Date;
    descripcion:string;
    tipo:string;
}

// Creo el Schema con sus respectivas condiciones para el control de errores desde el backend
export const EventSchema = new Schema<EventLogs>({
    nombre: {type: String, required: [true, 'El nombre es obligatorio'], minlength:[5,'El nombre es muy corto!']},
    fecha: {type: Date, required: [true, 'La fecha es obligatoria']},
    descripcion: {type: String, required: [true, 'La descripcion es obligatoria'], minlength:[5, 'La descripcion es muy corta!']},
    tipo: {type: String, required: [true, 'El tipo es obligatorio']}
}, {
    toJSON:{
        virtuals: true
    }, 
    toObject: {
        virtuals: true
    },
    timestamps: true
});

export const EventModel = model<EventLogs>('EventLogs', EventSchema);