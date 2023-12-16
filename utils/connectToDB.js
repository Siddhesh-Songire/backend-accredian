import mysql from 'mysql2';
import AppError from './appError.js';

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'Pass@123',
  database: process.env.DATABASE_NAME || 'accredian',
  port: process.env.DATABASE_PORT || 3308
});


const connectToDB = () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        console.error('Database connection failed: ', err);
        reject(new AppError('Database connection failed', 500));
      } else {
        console.log('Connected to MySQL database');
        resolve();
      }
    });
  });
};

export { connectToDB, db };