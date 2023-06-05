const express = require('express');
const connectDB = require('./src/config/db');
const bodyParser = require('body-parser');
const app = express();
const productRoutes = require('./src/routes/productRoutes');

// Other middleware and configurations

// Connect to the MongoDB database
connectDB();

app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

app.use('/api', productRoutes);

// Start the server
app.listen(7000, () => {
  console.log('Server is running on port 7000');
});
