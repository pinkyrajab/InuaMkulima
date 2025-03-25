const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');

// Helper function to read products from file
const readProducts = () => {
    try {
        const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Helper function to save products to file
const saveProducts = (products) => {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
};

// Function to add a new product
const addProduct = (name, price, description) => {
    const products = readProducts();
    const newProduct = { id: products.length + 1, name, price, description };
    products.push(newProduct);
    saveProducts(products);
    return newProduct;
};

// Function to get all products
const getAllProducts = () => {
    return readProducts();
};

module.exports = { getAllProducts, addProduct };