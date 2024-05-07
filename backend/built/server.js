"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var database_config_1 = __importDefault(require("./configs/database.config"));
var event_log_router_1 = __importDefault(require("./routers/event.log.router"));
(0, database_config_1.default)();
var client_1 = __importDefault(require("./rabbitmq/client"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:4200"]
}));
// rutas a las apis
app.use("/api/eventlogs/", event_log_router_1.default);
// Especifico las rutas al crear la carpeta public para el despliegue
app.use(express_1.default.static(path_1.default.join('public', 'browser')));
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'public', 'browser', 'index.html'));
});
// especifico el puerto para el despliege 
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("website served on http://localhost:" + port);
    client_1.default.initialize();
});
