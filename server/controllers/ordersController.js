const pool = require('../config/db');

const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `OREN-${timestamp}-${random}`;
};

const createOrder = async (req, res) => {
  try {
    const {
      customer_name,
      customer_phone,
      delivery_address,
      neighborhood,
      delivery_notes,
      items,
      total
    } = req.body;

    const order_number = generateOrderNumber();

    const result = await pool.query(
      `INSERT INTO orders 
        (order_number, customer_name, customer_phone, delivery_address, neighborhood, delivery_notes, items, total)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [order_number, customer_name, customer_phone, delivery_address, neighborhood, delivery_notes, JSON.stringify(items), total]
    );

    const order = result.rows[0];

    // Respond immediately — don't wait for MoMo
    res.json(order);

    // Initiate MoMo payment in background
    setImmediate(async () => {
      try {
        const { requestToPay } = require('../services/momo');
        const referenceId = await requestToPay({
          amount: total,
          phone: customer_phone,
          orderId: order.id,
          orderNumber: order_number
        });

        await pool.query(
          'UPDATE orders SET mtn_reference = $1 WHERE id = $2',
          [referenceId, order.id]
        );
      } catch (momoErr) {
        console.error('MoMo payment initiation failed:', momoErr.message);
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrderByNumber = async (req, res) => {
  try {
    const { order_number } = req.params;
    const result = await pool.query(
      'SELECT * FROM orders WHERE order_number = $1',
      [order_number]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { order_number } = req.params;
    const { status } = req.body;

    const validStatuses = ['received', 'assembling', 'on_the_way', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(
      `UPDATE orders SET status = $1, updated_at = NOW() 
       WHERE order_number = $2 RETURNING *`,
      [status, order_number]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const checkPaymentStatus = async (req, res) => {
  try {
    const { order_number } = req.params;
    const result = await pool.query(
      'SELECT * FROM orders WHERE order_number = $1',
      [order_number]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = result.rows[0];

    if (!order.mtn_reference) {
      return res.json({ payment_status: 'pending' });
    }

    try {
      const { getPaymentStatus } = require('../services/momo');
      const status = await getPaymentStatus(order.mtn_reference);

      if (status.status === 'SUCCESSFUL') {
        await pool.query(
          `UPDATE orders SET payment_status = 'paid', status = 'received', updated_at = NOW() 
           WHERE order_number = $1`,
          [order_number]
        );
        return res.json({ payment_status: 'paid' });
      } else if (status.status === 'FAILED') {
        await pool.query(
          `UPDATE orders SET payment_status = 'failed', updated_at = NOW() 
           WHERE order_number = $1`,
          [order_number]
        );
        return res.json({ payment_status: 'failed' });
      } else {
        return res.json({ payment_status: 'pending' });
      }
    } catch (momoErr) {
      return res.json({ payment_status: 'pending' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createOrder, getOrderByNumber, getAllOrders, updateOrderStatus, checkPaymentStatus };