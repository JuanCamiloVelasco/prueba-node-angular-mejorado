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
var amqplib_1 = require("amqplib");
var rabbit_config_1 = __importDefault(require("../configs/rabbit.config"));
var consumer_1 = __importDefault(require("./consumer"));
var producer_1 = __importDefault(require("./producer"));
var RabbitMQClient = /** @class */ (function () {
    // hacer al Rabbit singletone para no crear una conexion nueva cada vez que llame "initialize()"
    function RabbitMQClient() {
        this.isInitialized = false;
    }
    ;
    RabbitMQClient.getInstance = function () {
        if (!this.instance) {
            this.instance = new RabbitMQClient();
        }
        return this.instance;
    };
    RabbitMQClient.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, rpcQueueCE, rpcQueueAE, rpcQueueOE, rpcQueueEE, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.isInitialized) {
                            return [2 /*return*/];
                        }
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 9, , 10]);
                        _a = this;
                        return [4 /*yield*/, (0, amqplib_1.connect)(rabbit_config_1.default.rabbitMQ.url)];
                    case 2:
                        _a.connection = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this.connection.createChannel()];
                    case 3:
                        _b.producerChannel = _d.sent();
                        _c = this;
                        return [4 /*yield*/, this.connection.createChannel()];
                    case 4:
                        _c.consumerChannel = _d.sent();
                        return [4 /*yield*/, this.consumerChannel.assertQueue('Evento Creado!', { durable: false })];
                    case 5:
                        rpcQueueCE = (_d.sent()).queue;
                        return [4 /*yield*/, this.consumerChannel.assertQueue('Evento Actualizado!', { durable: false })];
                    case 6:
                        rpcQueueAE = (_d.sent()).queue;
                        return [4 /*yield*/, this.consumerChannel.assertQueue('Evento Obtenido!', { durable: false })];
                    case 7:
                        rpcQueueOE = (_d.sent()).queue;
                        return [4 /*yield*/, this.consumerChannel.assertQueue('Evento Eliminado!', { durable: false })];
                    case 8:
                        rpcQueueEE = (_d.sent()).queue;
                        this.producer = new producer_1.default(this.producerChannel);
                        this.consumerCrear = new consumer_1.default(this.consumerChannel, rpcQueueCE);
                        this.consumerActualizar = new consumer_1.default(this.consumerChannel, rpcQueueAE);
                        this.consumerObtener = new consumer_1.default(this.consumerChannel, rpcQueueOE);
                        this.consumerEliminar = new consumer_1.default(this.consumerChannel, rpcQueueEE);
                        this.consumerCrear.consumeMessages();
                        this.consumerActualizar.consumeMessages();
                        this.consumerObtener.consumeMessages();
                        this.consumerEliminar.consumeMessages();
                        this.isInitialized = true;
                        return [3 /*break*/, 10];
                    case 9:
                        error_1 = _d.sent();
                        console.log("rabbitmq error...", error_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    RabbitMQClient.prototype.produce = function (data, correlationId, replyToQueue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.isInitialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.producer.producerMessages(data, correlationId, replyToQueue)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return RabbitMQClient;
}());
exports.default = RabbitMQClient.getInstance();
