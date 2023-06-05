const Product = require('../models/productModel');
const { resizeImage, saveImage } = require('../utils/imageUtils');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Mendapatkan daftar semua produk
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
};

// Handle the creation of a new product
exports.createProduct = async (req, res) => {
  try {
    // Get the product data from the request body
    const { name, price, description } = req.body;
    // Save the original image
    const originalImagePath = await saveImage(req.file);

    // Resize the image to 500px
    const resizedImagePath500 = await resizeImage(originalImagePath, 500);

    // Resize the image to 1000px
    const resizedImagePath1000 = await resizeImage(originalImagePath, 1000);
    // Create a new product object
    const newProduct = new Product({
      name,
      price,
      description,
      image1000: resizedImagePath1000,
      image500: resizedImagePath500,
    });
    // Save the new product to the database
    const createdProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: createdProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message,
    });
  }
};
// Mengedit produk berdasarkan ID
exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const image = req?.body?.image
    let resizedImagePath500
    let resizedImagePath1000
    if (image) { 
      const originalImagePath = await saveImage(image);
    // Resize the image to 500px
    resizedImagePath500 = await resizeImage(originalImagePath, 500);

    // Resize the image to 1000px
    resizedImagePath1000 = await resizeImage(originalImagePath, 1000);
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { name, description, price, image500: resizedImagePath500, image1000: resizedImagePath1000 },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    res.status(200).json({message: 'success',updatedProduct});
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengedit produk' });
  }
};

// Menghapus produk berdasarkan ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.deleteOne({ _id: id });
    if (product.deletedCount === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    res.status(200).json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghapus produk' });
  }
};
