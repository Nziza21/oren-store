const pool = require('../config/db');

const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM products ORDER BY created_at DESC';
    let values = [];

    if (category && category !== 'all') {
      query = 'SELECT * FROM products WHERE category = $1 ORDER BY created_at DESC';
      values = [category];
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllProducts, getProductById };