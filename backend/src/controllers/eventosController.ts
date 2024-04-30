import expressAsyncHandler from "express-async-handler";
import { EventModel } from "../models/Event.Logs";

export const mostrarEventos = expressAsyncHandler(async (req, res, next) => {
    try {
        const eventos = await EventModel.find()
        res.send(eventos);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

export const nuevoEvento = expressAsyncHandler(async( req, res, next) => {
    try {
        const evento = new EventModel(req.body);
        await EventModel.create(evento);
        res.send(evento);
    } catch (error) {
        console.log(error);
        let mensaje = Object.values(error.errors)
        res.status(400).send({
            mensaje: mensaje.map((err:any) => err.message)
        })
        next();
    }
});

export const actualizarEvento = expressAsyncHandler ( async (req, res, next) => { 
    try {
        const eventoAct = await EventModel.findOneAndUpdate({_id: req.params.id}, req.body, {  new: true, runValidators: true })
        res.send(eventoAct);
    } catch (error) {
        console.log(error);
        let mensaje = Object.values(error.errors)
        res.status(400).send({
            mensaje: mensaje.map((err:any) => err.message)
        })
        next();
    }
});

export const obtenerEvId = expressAsyncHandler( expressAsyncHandler ( async (req, res, next) => { 
    try {
        const eventoId = await EventModel.findById({_id: req.params.id})
        res.send(eventoId);
    } catch (error) {
        console.log(error);
        next();
    }
}));

export const eliminarEvento = expressAsyncHandler(expressAsyncHandler( async (req, res, next) => {
    try {
        await EventModel.findOneAndDelete({ _id: req.params.id })
        res.send({mensaje: 'El evento se ha eliminado correctamente'});
    } catch (error) {
        console.log(error);
        next(); 
    }
}));

export const filtroFechas = expressAsyncHandler(expressAsyncHandler( async (req, res, next) => {
    try {
        const fecha = await EventModel.find({fecha: {$gte: req.params.fecha1, $lte:req.params.fecha2}})
        res.send(fecha);
    } catch (error) {
        console.log(error);
        next();
    }
}));

export const filtroTipo = expressAsyncHandler(expressAsyncHandler( async (req, res, next) => {
    try {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const eventos = await EventModel.find({tipo: {$regex:searchRegex}});
        res.send(eventos);
    } catch (error) {
        console.log(error);
        next();
    }
}));

export const filtroTipoFecha = expressAsyncHandler(expressAsyncHandler( async (req, res, next) => {
    try {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const eventos = await EventModel.find({$and: [{tipo: {$regex:searchRegex}}, {fecha: {$gte: req.params.fecha1, $lte:req.params.fecha2}}]});
        res.send(eventos);
    } catch (error) {
        console.log(error);
        next();
    }
}));

export default mostrarEventos; 

