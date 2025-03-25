const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://localhost";

async function consumeTransactions() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = "transactions";

        await channel.assertQueue(queue, { durable: true });
        console.log("Waiting for transactions...");

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const transaction = JSON.parse(msg.content.toString());
                console.log("Processing transaction:", transaction);
                channel.ack(msg); 
            }
        });
    } catch (error) {
        console.error("RabbitMQ Consumer Error:", error);
    }
}

consumeTransactions();
