import { Router } from "express";
import { actualizarEvento, eliminarEvento, filtroFechas, filtroTipo, filtroTipoFecha, mostrarEventos, nuevoEvento, obtenerEvId } from "../controllers/eventosController"

const router = Router();

// Obtener todos los eventos
router.get("/", mostrarEventos);

// Crear un evento
router.post('/register', nuevoEvento);

// actualizar un evento
router.put("/eventos/:id", actualizarEvento);

// Obtener evento por id
router.get("/:id", obtenerEvId);

// eliminar un evento
router.delete("/evento/:id", eliminarEvento);

// Buscar evento por rango de fechas
router.get("/fecha/:fecha1/:fecha2", filtroFechas);

// Buscar evento por tipo
router.get("/buscar/:searchTerm", filtroTipo);

// Buscar evento por tipo y fecha
router.get("/buscarAvanzada/:searchTerm/:fecha1/:fecha2", filtroTipoFecha);

export default router;