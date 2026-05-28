CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(20) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  delivery_address TEXT NOT NULL,
  neighborhood VARCHAR(255) NOT NULL,
  delivery_notes TEXT,
  items JSONB NOT NULL,
  total INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'received',
  payment_status VARCHAR(50) DEFAULT 'pending',
  mtn_reference VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);