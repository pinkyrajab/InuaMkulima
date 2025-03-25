

const fs = require("fs");
const path = require("path");
const { connectRabbitMQ } = require("../utils/rabbitmq");
const logger = require("../utils/logger");

const filePath = path.join(__dirname, "../data/wallets.json");

const readWallets = () => {
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading wallet file:", error);
        return [];
    }
};

const writeWallets = (wallets) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(wallets, null, 2));
    } catch (error) {
        logger.error(`Error writing to wallet file: ${error.message}`);
    }
};

exports.recordTransaction = async (req, res) => {
    const { farmerId, amount } = req.body;

    if (!farmerId || amount === undefined) {
        logger.warn(`Missing required parameters - Farmer ID: ${farmerId}, Amount: ${amount}`);
        return res.status(400).json({ status: "400", message: "Farmer ID and amount are required" });
    }

    let wallets = readWallets();
    let wallet = wallets.find((w) => w.farmerId === farmerId);

    if (!wallet) {
        logger.warn(`Transaction failed - Wallet not found for Farmer ID: ${farmerId}`);
        return res.status(400).json({ status: "400", message: "Farmer wallet not found" });
    }

    if (wallet.balance < amount) {
        logger.warn(`Transaction failed - Insufficient balance for Farmer ID: ${farmerId}`);
        return res.status(400).json({ status: "400", message: "Insufficient balance" });
    }

    wallet.balance -= amount;
    writeWallets(wallets);

    logger.info(`Transaction successful - Farmer ID: ${farmerId}, Amount: ${amount}, New Balance: ${wallet.balance}`);
    
    const channel = await connectRabbitMQ();
    if (channel) {
        const queue = "transactions";
        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify({ farmerId, amount })));
        console.log("Transaction event published:", { farmerId, amount });
    }

    return res.status(200).json({ status: "200", message: "Transaction successful", data: { balance: wallet.balance } });
};
