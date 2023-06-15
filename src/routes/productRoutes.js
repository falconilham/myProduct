const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Direktori tujuan untuk menyimpan gambar yang diunggah
const productController = require('../controllers/productController');

router.get('/', (_, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello from Express.js!</h1>');
    res.end();
});
  
// GET /products
router.get('/products', productController.getAllProducts);

// POST /products
router.post('/products', upload.single('image'), productController.createProduct);

// PUT /products/:id
router.put('/products/:id', productController.editProduct);

// DELETE /products/:id
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
