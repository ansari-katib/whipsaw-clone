import express from 'express';
import { login } from '../controller/userController.js';

const userRoute = express.Router();

userRoute.post("/login" , login);

export default userRoute ;
