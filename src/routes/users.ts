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

userRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateFields = req.body;

    const user = await User.update(
      updateFields,
      {
      where: { id: req.params.id }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
  }
}


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