const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByUsername, createUser } = require('../models/userModel');
const logger = require("../utils/logger");

const SECRET_KEY = process.env.JWT_SECRET || 'ARAJAB20';

// Login User
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = findUserByUsername(username);

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(200).json({ status: '200', message: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ status: '000', message: 'Login successful', token });
    } catch (error) {
        // console.error("Login Error:", error); 
        logger.error(`Login Error: ${error.message}`);
        res.status(400).json({ status: '400', message: 'Internal Server Error' });
    }
};

// Register User
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await createUser(username, password);
        res.status(201).json({ message: 'User registered', user: newUser });
        
    } catch (error) {
        logger.error(`Register Error: ${error.message}`);
        res.status(400).json({ status: '400', message: 'Internal Server Error' });
    }
    
};

module.exports = { loginUser, registerUser };
