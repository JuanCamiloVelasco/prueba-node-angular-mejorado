import { Channel } from "amqplib";

export default class Producer {
    constructor(private channel: Channel) {}

    async producerMessages(data:any, correlationId: string, replyToQueue: string) {
        console.log('Respondiendo con...', data);
        this.channel.sendToQueue(replyToQueue, 
        Buffer.from(JSON.stringify(data)), {
            correlationId: correlationId
        })
    }
}