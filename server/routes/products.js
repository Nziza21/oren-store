const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct } = require('../controllers/productsController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

module.exports = router;