require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); 
app.use(morgan('dev')); 

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined in .env file!");
} else {
  console.log("JWT Secret Key Loaded");
}

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const walletRoutes = require('./routes/walletRoutes');

// Use Routes
app.use('/api/auth', authRoutes);           
app.use('/api/products', productRoutes);    
app.use('/api/transactions', transactionRoutes); 
app.use('/api/wallet', walletRoutes);       

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Farmer Wallet API!');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
