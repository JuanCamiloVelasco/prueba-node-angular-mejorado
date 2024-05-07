import expressAsyncHandler from "express-async-handler";
import { EventModel } from "../models/Event.Logs";
import RabbitMQClient from "../rabbitmq/client";

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
        await RabbitMQClient.produce('Evento Creado!', req.body);
        const evento = new EventModel(req.body);
        res.send(evento);
    } catch (error) {
        console.log(error);
        // Creo las variables las cuales convierten los errores en arreglos para poderlos mapear y extraer mas facilmente 
        let mensaje = Object.values(error.errors);
        let controlErrores = Object.values(error);
        console.log(controlErrores);
        // Envio una respuesta de status 400 para que se reciba el mensaje de error personalizado en el front
        res.status(400).send({
            mensaje: mensaje.map((err:any) => err.message),
            prueba: controlErrores[0]
        })
        next();
    }
});

export const actualizarEvento = expressAsyncHandler ( async (req, res, next) => { 
    try {
        await RabbitMQClient.produce('Evento Actualizado!', req.body);
        // Utilizo el "runValidators: true" para que se sigan evaluando las condiciones al momento de actualizar
        const eventoAct = await EventModel.findOneAndUpdate({_id: req.params.id}, req.body, {  new: true, runValidators: true })
        res.send(eventoAct);
    } catch (error) {
        console.log(error);
        // Creo las variables las cuales convierten los errores en arreglos para poderlos mapear y extraer mas facilmente 
        let mensaje = Object.values(error.errors);
        let controlErrores = Object.values(error);
        // Envio una respuesta de status 400 para que se reciba el mensaje de error personalizado en el front
        res.status(400).send({
            mensaje: mensaje.map((err:any) => err.message),
            controlErrores: controlErrores[0]
        })
        next();
    }
});

export const obtenerEvId = expressAsyncHandler( expressAsyncHandler ( async (req, res, next) => { 
    try {
        await RabbitMQClient.produce('Evento Obtenido!',req.params.id);
        const eventoId = await EventModel.findById({_id: req.params.id})
        res.send(eventoId);
    } catch (error) {
        console.log(error);
        next();
    }
}));

export const eliminarEvento = expressAsyncHandler(expressAsyncHandler( async (req, res, next) => {
    try {
        await RabbitMQClient.produce('Evento Eliminado!',req.params.id);
        await EventModel.findOneAndDelete({ _id: req.params.id })
        res.send({mensaje: 'El evento se ha eliminado correctamente'});
    } catch (error) {
        console.log(error);
        next(); 
    }
}));

export const filtroFechas = expressAsyncHandler( async (req, res, next) => {
    try {
        // encuentro las fechas por rango de menor a mayor
        const fecha = await EventModel.find({fecha: {$gte: req.params.fecha1, $lte:req.params.fecha2}})
        res.send(fecha);
    } catch (error) {
        console.log(error);
        next();
    }
});

export const filtroTipo = expressAsyncHandler( async (req, res, next) => {
    try {
        // Filtro por tipo con la ayuda de $regex
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const eventos = await EventModel.find({tipo: {$regex:searchRegex}});
        res.send(eventos);
    } catch (error) {
        console.log(error);
        next();
    }
});

export const filtroTipoFecha = expressAsyncHandler( async (req, res, next) => {
    try {
        // combino los dos filtros con ayuda de $and
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const eventos = await EventModel.find({$and: [{tipo: {$regex:searchRegex}}, {fecha: {$gte: req.params.fecha1, $lte:req.params.fecha2}}]});
        res.send(eventos);
    } catch (error) {
        console.log(error);
        next();
    }
});

export default mostrarEventos;