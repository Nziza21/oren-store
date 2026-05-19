CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  category VARCHAR(100) NOT NULL,
  sizes TEXT[],
  stock INTEGER DEFAULT 0,
  badge VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);