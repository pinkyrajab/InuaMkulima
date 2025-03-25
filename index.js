const express = require("express");
const { connectDB, sql } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to database
connectDB();

// Sample API to fetch data from InuaMkulima
app.get("/test-db", async (req, res) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query("SELECT TOP 5 * FROM INFORMATION_SCHEMA.TABLES");
        
        res.json({ message: "Connected Successfully!", tables: result.recordset });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
