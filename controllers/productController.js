const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');

// Read products from file
const readProducts = () => {
    try {
        const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Save products to file
const saveProducts = (products) => {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
};

// Get all products
const getAllProducts = (req, res) => {
    try {
        const products = readProducts();
        res.json({ status: "000", message: "Products retrieved", data: products });
    } catch (error) {
        console.error("GetProducts:", error); 
        res.status(400).json({ status: '400', message: 'Unable to fetch products' });
    }
   
};

// Add a new product
const addProduct = (req, res) => {
    try {
        const { name, price, description } = req.body;
        if (!name) {
            return res.status(200).json({ status: "200", message: "Product name is required" });
        }

        const products = readProducts();
        const newProduct = { id: products.length + 1, name, price, description };
        products.push(newProduct);
        saveProducts(products);

        res.json({ status: "000", message: "Product added successfully", data: newProduct });
    } catch (error) {
        console.error("Product Creation Error::", error); 
        res.status(400).json({ status: '400', message: 'Database error' });
    }
    
};

module.exports = { getAllProducts, addProduct };
