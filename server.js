const express = require('express');
const connectDB = require('./config/db');
const app = express();
const productRoutes = require('./src/routes/productRoutes');

// Other middleware and configurations

// Connect to the MongoDB database
connectDB();

app.use('/api', productRoutes);

// Start the server
app.listen(7000, () => {
  console.log('Server is running on port 7000');
});
