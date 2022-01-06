-- create products table 
CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price NUMERIC(12, 2) NOT NULL,
  category VARCHAR(50) NOT NULL
);