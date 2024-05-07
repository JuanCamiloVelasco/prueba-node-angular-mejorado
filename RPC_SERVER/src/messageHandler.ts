import RabbitMQClient from './rabbitmq/client';

export default class MessageHandler {
    static async handle(data: any, correlationId: string, replyTo: string) {
        await RabbitMQClient.produce(data, correlationId, replyTo);
    }
}