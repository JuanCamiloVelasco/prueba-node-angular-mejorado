import { Schema, model } from "mongoose";

export interface EventLogs{
    id:string;
    nombre:string;
    fecha:Date;
    descripcion:string;
    tipo:string;
}

export const EventSchema = new Schema<EventLogs>({
    nombre: {type: String, required: true},
    fecha: {type: Date, required: true},
    descripcion: {type: String, required: true},
    tipo: {type: String, required: true}
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