import { Channel, ConsumeMessage } from "amqplib";
import { EventEmitter } from 'events';

export default class Consummer {
    constructor(private channel: Channel, private replyQueueName: string, private eventEmitter: EventEmitter) {}

    async consumeMessages() {
        console.log('Listo para consumir mensajes...');

        this.channel.consume(this.replyQueueName, (message: ConsumeMessage) => {
            console.log('la respuesta es..', JSON.parse(message.content.toString()));
            this.eventEmitter.emit(message.properties.correlationId.toString(), message)
        }, {
            noAck: true,
        });
    }
}