const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Fungsi untuk mengubah ukuran gambar
const resizeImage = async (imageBuffer, size) => {
  try {
    const resizedImageBuffer = await sharp(imageBuffer).resize(size).toBuffer();
    // Tulis logika Anda di sini untuk menyimpan gambar ke server yang telah di-deploy
    return `path/to/resized_image_${size}.jpg`; // Mengembalikan path gambar yang diubah ukurannya
  } catch (error) {
    throw new Error('Terjadi kesalahan saat memproses gambar');
  }
};

// Function to save the image file
const saveImage = async (imageData) => {
    const { path: tempImagePath, filename } = imageData;
  
    // Specify the directory to save the image
    const directory = path.join(__dirname, '../images');
    const imagePath = path.join(directory, filename);
  
    // Create the directory if it doesn't exist
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  
    // Move the image file to the specified path
    await fs.promises.rename(tempImagePath, imagePath);
  
    return imagePath;
  };
  
  // Helper function to generate a unique filename
  const generateUniqueFilename = () => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${timestamp}_${randomString}.png`;
  };

module.exports = {
    resizeImage,
    saveImage
};
