import { Channel } from "amqplib";
import rabbitConfig from "../configs/rabbit.config";
import { randomUUID } from "crypto";
import { EventEmitter } from 'events';

export default class Producer {
    constructor(private channel: Channel, private replyQueueName: string, private eventEmitter:EventEmitter ) {}

    async producerMessages(queue:string, data:any) {
        const uuid = randomUUID();
        console.log('the corr id is', uuid);
        this.channel.sendToQueue(queue, 
        Buffer.from(JSON.stringify(data)), {
            replyTo: this.replyQueueName,
            correlationId: uuid,
            expiration: 500
        });
        // esperar por la respuesta
        return new Promise((resolve, reject) => {
            this.eventEmitter.once(uuid, async (data) => {
                const reply = JSON.parse(data.content.toString());
                resolve(reply);
            });
        });
    };
}