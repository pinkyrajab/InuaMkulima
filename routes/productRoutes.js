const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); 
const authMiddleware = require('../middleware/authMiddleware'); 

// router.get('/', productController.getAllProducts);
// router.post('/', productController.addProduct);

router.get('/', authMiddleware, productController.getAllProducts);
router.post('/', authMiddleware, productController.addProduct);

module.exports = router;
