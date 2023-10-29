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

userRouter.get('/:id', async (req, res) => {
  try {
    const users = await User.findOne({
      where: { id: req.params.id }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
  }
});

userRouter.post('/', async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    const user = await User.destroy({
      where: { id: req.params.id }
    });
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});