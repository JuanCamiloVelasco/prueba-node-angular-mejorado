import { Channel, Connection, connect } from "amqplib";
import rabbitConfig from "../configs/rabbit.config";
import Consummer from "./consumer";
import Producer from "./producer";
import { EventEmitter } from 'events';

class RabbitMQClient {

    // hacer al Rabbit singletone para no crear una conexion nueva cada vez que llame "initialize()"
    private constructor(){};
    private static instance: RabbitMQClient;
    private isInitialized = false;

    // variables para mi conexion, produccion y consumo
    private producer: Producer;
    private consumer: Consummer;
    private connection!: Connection;
    private producerChannel!: Channel;
    private consumerChannel!: Channel;

    private eventEmitter: EventEmitter;

    public static getInstance() {
        if(!this.instance) {
            this.instance = new RabbitMQClient();
        }
        return this.instance;
    }
    
    async initialize() {
        if(this.isInitialized) {
            return;
        }
        try {
            this.connection = await connect(rabbitConfig.rabbitMQ.url);
            this.producerChannel = await this.connection.createChannel();
            this.consumerChannel = await this.connection.createChannel();

            const {queue: replyQueueName} = await this.consumerChannel.assertQueue('', {exclusive: true});

            this.eventEmitter = new EventEmitter();
            this.producer = new Producer(this.producerChannel, replyQueueName, this.eventEmitter);
            this.consumer = new Consummer(this.consumerChannel, replyQueueName, this.eventEmitter);

            this.consumer.consumeMessages();
            
            this.isInitialized = true;
        } catch (error) {
            console.log("rabbitmq error...", error)
        }
    }
    async produce(queue:string, data: any) {
        if(!this.isInitialized){
            await this.initialize();
        }
        return await this.producer.producerMessages(queue, data);
    }
}

export default RabbitMQClient.getInstance();