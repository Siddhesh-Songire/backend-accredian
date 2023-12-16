import express from 'express';
import { signIn, signUp } from '../Controller/userController.js';
const router = express.Router();

router.route('/login').post(signIn);
router.route('/signup').post(signUp);


export default router;
