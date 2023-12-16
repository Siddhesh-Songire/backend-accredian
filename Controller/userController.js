import bcrypt from 'bcrypt';
import {
    db
} from '../utils/connectToDB.js';

// Sign-up Endpoint
export const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
            if(!email || !password){
            res.status(400).json({error:'email or password cannot be empty'})
        }
        // Check if the email is already registered
        const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
        const results = await new Promise((resolve, reject) => {
            db.query(checkEmailQuery, [email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        if (results.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
                if (hashErr) {
                    console.log(hashErr);
                    reject(hashErr);
                } else {
                    resolve(hashedPassword);
                }
            });
        });

        // Store user data in the database
        const createUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
        await new Promise((resolve, reject) => {
            db.query(createUserQuery, [email, hashedPassword], (createErr) => {
                if (createErr) {
                    reject(createErr);
                } else {
                    resolve();
                }
            });
        });

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error in signUp:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login Endpoint
export const signIn = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    if(!email || !password){
        res.status(400).json({error:'email or password cannot be empty'})
    }
    // Check if the email exists
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Internal Server Error'
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, results[0].password, (compareErr, isMatch) => {
            if (compareErr) {
                return res.status(500).json({
                    error: 'Internal Server Error'
                });
            }

            if (!isMatch) {
                return res.status(401).json({
                    error: 'Invalid credentials'
                });
            }

            return res.status(200).json({
                message: 'Login successful',
                data:{
                    id: results[0]?.id,
                    email:results[0]?.email
                }
            });
        });
    });
};