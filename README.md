# Transaction API with JWT Authentication & RabbitMQ Integration

A RESTful API for managing authentication, products, transactions, and farmer wallets using Node.js, Express, JWT authentication, and RabbitMQ for event-driven processing and also used Winston for logs.

 Features
- **Authentication:** Users must log in to obtain a JWT token.
- **Product Management:** Add and retrieve products.
- **Transaction Processing:** Handles wallet transactions (buying/selling).
- **Event-Driven Processing:** Uses RabbitMQ for asynchronous transaction events.
- **Logging & Monitoring:** Supports file-based logging and external monitoring with Winston.


**Why JSON Files Instead of a Database?**
Initially, I planned to use MSSQL Server as the database for storing products, transactions, and wallet balances. However, I encountered issues with SQL Server Management Studio (SSMS) that prevented a smooth setup.
To save time and ensure rapid development, I decided to use JSON files as a temporary data store. This allowed me to focus on implementing the core business logic without delays caused by database configuration.

**Dependencies Used**
-express – Framework for building the API.
-dotenv – Loads environment variables from .env file.
-jsonwebtoken – Handles JWT authentication.
-bcryptjs – Hashes passwords securely.
-fs – Reads and writes JSON files for temporary storage.
-path – Handles file paths for JSON storage.
-amqplib – Implements RabbitMQ for event-driven processing.
-morgan – Logs API requests for debugging.
-winston – Writes logs to files and supports external logging.

## Installation & Setup
###  Clone the Repository 
```sh
git clone https://github.com/pinkyrajab/InuaMkulima.git
cd transaction-api

