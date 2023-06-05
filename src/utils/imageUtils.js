const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Function to resize the image
const resizeImage = async (imageBuffer, size) => {
  try {
    const resizedImageBuffer = await sharp(imageBuffer).resize(size).toBuffer();
    const uniqueFilename = generateUniqueFilename();
    const imagePath = path.join(__dirname, `../../uploads/resized_image_${uniqueFilename}_${size}.jpg`);

    // Save the resized image to the server
    await fs.promises.writeFile(imagePath, resizedImageBuffer);

    return imagePath;
  } catch (error) {
    throw new Error('Terjadi kesalahan saat memproses gambar');
  }
};

// Function to save the image file
const saveImage = async (imageData) => {
  const { path: tempImagePath, mimetype } = imageData;

  // Generate a unique filename using timestamp and random string
  const uniqueFilename = generateUniqueFilename();
  const fileExtension = mimetype.split('/')[1];
  const uniqueFileNameWithExtension = `${uniqueFilename}.${fileExtension}`;

  // Specify the directory to save the image
  const directory = path.join(__dirname, '../../uploads');
  const imagePath = path.join(directory, uniqueFileNameWithExtension);

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
  return `${timestamp}_${randomString}`;
};

module.exports = {
  resizeImage,
  saveImage
};
