const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByUsername, createUser } = require('../models/userModel');

const SECRET_KEY = process.env.JWT_SECRET || 'ARAJAB20';

// Login User
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = findUserByUsername(username);

    if (!user) return res.status(400).json({ message: 'Internal Server Error' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
};

// Register User
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const newUser = await createUser(username, password);
    res.status(201).json({ message: 'User registered', user: newUser });
};

module.exports = { loginUser, registerUser };
