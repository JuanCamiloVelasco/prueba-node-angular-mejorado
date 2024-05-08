"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filtroTipoFecha = exports.filtroTipo = exports.filtroFechas = exports.eliminarEvento = exports.obtenerEvId = exports.actualizarEvento = exports.nuevoEvento = exports.mostrarEventos = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var Event_Logs_1 = require("../models/Event.Logs");
var client_1 = __importDefault(require("../rabbitmq/client"));
exports.mostrarEventos = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var eventos, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Event_Logs_1.EventModel.find()];
            case 1:
                eventos = _a.sent();
                res.send(eventos);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                res.send(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.nuevoEvento = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var evento, error_2, mensaje, controlErrores;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client_1.default.produce('Evento Creado!', req.body)];
            case 1:
                _a.sent();
                evento = new Event_Logs_1.EventModel(req.body);
                res.send(evento);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                mensaje = Object.values(error_2.errors);
                controlErrores = Object.values(error_2);
                console.log(controlErrores);
                // Envio una respuesta de status 400 para que se reciba el mensaje de error personalizado en el front
                res.status(400).send({
                    mensaje: mensaje.map(function (err) { return err.message; }),
                    prueba: controlErrores[0]
                });
                next();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.actualizarEvento = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var eventoAct, error_3, mensaje, controlErrores;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, client_1.default.produce('Evento Actualizado!', req.body)];
            case 1:
                _a.sent();
                return [4 /*yield*/, Event_Logs_1.EventModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })];
            case 2:
                eventoAct = _a.sent();
                res.send(eventoAct);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                mensaje = Object.values(error_3.errors);
                controlErrores = Object.values(error_3);
                // Envio una respuesta de status 400 para que se reciba el mensaje de error personalizado en el front
                res.status(400).send({
                    mensaje: mensaje.map(function (err) { return err.message; }),
                    controlErrores: controlErrores[0]
                });
                next();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.obtenerEvId = (0, express_async_handler_1.default)((0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var eventoId, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, client_1.default.produce('Evento Obtenido!', req.params.id)];
            case 1:
                _a.sent();
                return [4 /*yield*/, Event_Logs_1.EventModel.findById({ _id: req.params.id })];
            case 2:
                eventoId = _a.sent();
                res.send(eventoId);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                next();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
exports.eliminarEvento = (0, express_async_handler_1.default)((0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, client_1.default.produce('Evento Eliminado!', req.params.id)];
            case 1:
                _a.sent();
                return [4 /*yield*/, Event_Logs_1.EventModel.findOneAndDelete({ _id: req.params.id })];
            case 2:
                _a.sent();
                res.send({ mensaje: 'El evento se ha eliminado correctamente' });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                next();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
exports.filtroFechas = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var fecha, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Event_Logs_1.EventModel.find({ fecha: { $gte: req.params.fecha1, $lte: req.params.fecha2 } })];
            case 1:
                fecha = _a.sent();
                res.send(fecha);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.log(error_6);
                next();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.filtroTipo = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var searchRegex, eventos, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                searchRegex = new RegExp(req.params.searchTerm, 'i');
                return [4 /*yield*/, Event_Logs_1.EventModel.find({ tipo: { $regex: searchRegex } })];
            case 1:
                eventos = _a.sent();
                res.send(eventos);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.log(error_7);
                next();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.filtroTipoFecha = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var searchRegex, eventos, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                searchRegex = new RegExp(req.params.searchTerm, 'i');
                return [4 /*yield*/, Event_Logs_1.EventModel.find({ $and: [{ tipo: { $regex: searchRegex } }, { fecha: { $gte: req.params.fecha1, $lte: req.params.fecha2 } }] })];
            case 1:
                eventos = _a.sent();
                res.send(eventos);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.log(error_8);
                next();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = exports.mostrarEventos;
