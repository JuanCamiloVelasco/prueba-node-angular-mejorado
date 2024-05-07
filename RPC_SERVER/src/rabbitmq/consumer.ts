import { Channel, ConsumeMessage } from "amqplib";
import MessageHandler from "../messageHandler";

export default class Consummer {
    constructor(private channel: Channel, private rpcQueue: string) {}

    async consumeMessages() {
        console.log('Listo para consumir mensajes...');

        this.channel.consume(this.rpcQueue, async (message: ConsumeMessage) => {
            const { correlationId, replyTo } = message.properties;

            if (!correlationId || !replyTo) {
                console.log('Faltan propiedades..')
            } else {
                console.log("Consumed!", JSON.parse(message.content.toString()));
                await MessageHandler.handle(JSON.parse(message.content.toString()), correlationId, replyTo);
            }
        }, {
            noAck: true,
        });
    }
}