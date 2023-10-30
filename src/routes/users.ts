import express, {Request, Response } from 'express';
import { sequelize } from '../../config/db';
import { User } from '../models/user';
import { confirmNewPassword, hashPassword, validatePassword } from '../utils/password';
import { CustomError } from '../middleware/customError';
import { generateToken } from '../utils/jwt';

export const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      order: [
        ['createdAt', 'DESC']
      ],
      where: req.query
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

userRouter.get('/:id', async (req, res) => {
  try {
    const users = await User.findOne({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      where: { id: req.params.id }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
  }
});

userRouter.post('/signup', async (req, res) => {
  try {
    if (!confirmNewPassword(req.body)) throw new CustomError(400, ['passwords do not match']);

    req.body.password = await hashPassword(req.body.password);   

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    const token = generateToken(user);

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    };

    res.json(userData);
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