const express = require('express');
const pool = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'ORÉN server is running' });
});

app.listen(PORT, () => {
  console.log(`ORÉN server running on port ${PORT}`);
});