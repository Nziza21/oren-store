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

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes, stock, badge } = req.body;

    const result = await pool.query(
      `INSERT INTO products (name, description, price, category, sizes, stock, badge)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, description, price, category, sizes, stock, badge || null]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, sizes, stock, badge } = req.body;

    const result = await pool.query(
      `UPDATE products SET name=$1, description=$2, price=$3, category=$4, sizes=$5, stock=$6, badge=$7
       WHERE id=$8 RETURNING *`,
      [name, description, price, category, sizes, stock, badge || null, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct };