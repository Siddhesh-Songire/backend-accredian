-- CREATE DATABASE 
CREATE DATABASE IF NOT EXISTS Accredian;

USE Accredian;

-- Create a table to store user information
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Commit changes
COMMIT;