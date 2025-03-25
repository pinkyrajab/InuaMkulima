const winston = require('winston');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');
const logFile = path.join(logsDir, 'transactions.log');

const fs = require('fs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), 
        new winston.transports.File({ filename: logFile }) 
    ],
});

module.exports = logger;
