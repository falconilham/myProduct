const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Direktori tujuan untuk menyimpan gambar yang diunggah
const productController = require('../controllers/productController');

// GET /products
router.get('/products', productController.getAllProducts);

// POST /products
router.post('/products', upload.single('image'), productController.createProduct);

// PUT /products/:id
router.put('/products/:id', productController.editProduct);

// DELETE /products/:id
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
