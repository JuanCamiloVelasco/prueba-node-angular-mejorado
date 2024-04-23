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
exports.default = router;
