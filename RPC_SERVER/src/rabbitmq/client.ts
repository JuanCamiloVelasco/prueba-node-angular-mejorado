import { Channel, Connection, connect } from "amqplib";
import rabbitConfig from "../configs/rabbit.config";
import Consummer from "./consumer";
import Producer from "./producer";

class RabbitMQClient {

    // hacer al Rabbit singletone para no crear una conexion nueva cada vez que llame "initialize()"
    private constructor(){};
    private static instance: RabbitMQClient;
    private isInitialized = false;

    // variables para mi conexion, produccion y consumo
    private producer: Producer;
    private consumerCrear: Consummer;
    private consumerActualizar: Consummer;
    private consumerObtener: Consummer;
    private consumerEliminar: Consummer;
    private connection!: Connection;
    private producerChannel!: Channel;
    private consumerChannel!: Channel;

    public static getInstance() {
        if(!this.instance) {
            this.instance = new RabbitMQClient();
        }
        return this.instance;
    }
    
    async initialize() {
        console.log("holaaaaaaaaaaa");
        if(this.isInitialized) {
            return;
        }
        try {
            this.connection = await connect(rabbitConfig.rabbitMQ.url);
            this.producerChannel = await this.connection.createChannel();
            this.consumerChannel = await this.connection.createChannel();

            const {queue: rpcQueueCE} = await this.consumerChannel.assertQueue('Evento Creado!', {durable: false});
            const {queue: rpcQueueAE} = await this.consumerChannel.assertQueue('Evento Actualizado!', {durable: false});
            const {queue: rpcQueueOE} = await this.consumerChannel.assertQueue('Evento Obtenido!', {durable: false});
            const {queue: rpcQueueEE} = await this.consumerChannel.assertQueue('Evento Eliminado!', {durable: false});

            this.producer = new Producer(this.producerChannel);
            this.consumerCrear = new Consummer(this.consumerChannel, rpcQueueCE);
            this.consumerActualizar = new Consummer(this.consumerChannel, rpcQueueAE);
            this.consumerObtener = new Consummer(this.consumerChannel, rpcQueueOE);
            this.consumerEliminar = new Consummer(this.consumerChannel, rpcQueueEE);

            this.consumerCrear.consumeMessages();
            this.consumerActualizar.consumeMessages();
            this.consumerObtener.consumeMessages();
            this.consumerEliminar.consumeMessages();
            
            this.isInitialized = true;
        } catch (error) {
            console.log("rabbitmq error...", error)
        }
    }
    async produce(data: any, correlationId: string, replyToQueue: string) {
        if(!this.isInitialized){
            await this.initialize();
        }
        return await this.producer.producerMessages(data, correlationId, replyToQueue);
    }
}

export default RabbitMQClient.getInstance();