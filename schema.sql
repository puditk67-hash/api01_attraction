CREATE DATABASE IF NOT EXISTS attraction_db;
USE attraction_db;

CREATE TABLE attractions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  part VARCHAR(255),
  description TEXT,
  origin VARCHAR(255),
  price DECIMAL(10,2),
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);