const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://localhost"; 

async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        console.log("Connected to RabbitMQ");
        return channel;
    } catch (error) {
        console.error("RabbitMQ connection error:", error);
    }
}

module.exports = { connectRabbitMQ };
