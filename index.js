import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToDB } from "./utils/connectToDB.js";
import userRouter from './Routes/user-routes.js'
dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(cors());


// routes
app.use('/api/v1/users', userRouter);


// Connect to MySQL database
connectToDB()
  .then(() => {
    // Start your express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1); // Exit the process if database connection fails
  });