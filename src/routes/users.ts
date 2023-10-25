import express, {Request, Response } from 'express';
import { sequelize } from '../../config/db';
import { User } from '../models/user';
export const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
  }
});