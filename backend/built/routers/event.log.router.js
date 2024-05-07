"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var eventosController_1 = require("../controllers/eventosController");
var router = (0, express_1.Router)();
// Obtener todos los eventos
router.get("/", eventosController_1.mostrarEventos);
// Crear un evento
router.post('/register', eventosController_1.nuevoEvento);
// actualizar un evento
router.put("/eventos/:id", eventosController_1.actualizarEvento);
// Obtener evento por id
router.get("/:id", eventosController_1.obtenerEvId);
// eliminar un evento
router.delete("/evento/:id", eventosController_1.eliminarEvento);
// Buscar evento por rango de fechas
router.get("/fecha/:fecha1/:fecha2", eventosController_1.filtroFechas);
// Buscar evento por tipo
router.get("/buscar/:searchTerm", eventosController_1.filtroTipo);
// Buscar evento por tipo y fecha
router.get("/buscarAvanzada/:searchTerm/:fecha1/:fecha2", eventosController_1.filtroTipoFecha);
exports.default = router;
// amqp.connect('amqps://doepxdjn:3dKa87V605274ZsGgUdKsmki81VoVeEP@moose.rmq.cloudamqp.com/doepxdjn', (error0, connection) => {
//     if(error0) {
//         throw error0
//     }
//     connection.createChannel((error1, Channel) => {
//         if(error1) {
//             throw error1
//         }
//         // Obtener todos los eventos
//         router.get("/", mostrarEventos);
//         Channel.sendToQueue("hola", Buffer.from('hola'));
//         // Crear un evento
//         router.post('/register', nuevoEvento);
//         Channel.assertQueue('hola', {durable: false});
//         // actualizar un evento
//         router.put("/eventos/:id", actualizarEvento);
//         // Obtener evento por id
//         router.get("/:id", obtenerEvId);
//         Channel.consume('hola', (msg) => {
//             console.log(msg.content.toString())
//         })
//         // eliminar un evento
//         router.delete("/evento/:id", eliminarEvento);
//         // Buscar evento por rango de fechas
//         router.get("/fecha/:fecha1/:fecha2", filtroFechas);
//         // Buscar evento por tipo
//         router.get("/buscar/:searchTerm", filtroTipo);
//         // Buscar evento por tipo y fecha
//         router.get("/buscarAvanzada/:searchTerm/:fecha1/:fecha2", filtroTipoFecha);
// })})
