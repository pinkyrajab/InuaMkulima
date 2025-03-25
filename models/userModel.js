const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const usersFilePath = path.join(__dirname, '../data/users.json');

const loadUsers = () => {
    if (!fs.existsSync(usersFilePath)) return [];
    return JSON.parse(fs.readFileSync(usersFilePath));
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const createUser = async (username, password) => {
    const users = loadUsers();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);
    saveUsers(users);

    return newUser;
};

const findUserByUsername = (username) => {
    return loadUsers().find(user => user.username === username);
};

module.exports = { createUser, findUserByUsername };
