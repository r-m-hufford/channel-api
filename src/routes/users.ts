import express, {Request, Response } from 'express';
import { sequelize } from '../../config/db';
import { User } from '../models/user';
import { confirmNewPassword, hashPassword } from '../utils/password';
import { HttpError } from '../middleware/httpError';
import { generateToken } from '../utils/jwt';
import { create, destroy, findAll, findOne, update } from '../services/user-service';

export const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  try {
    const users = await findAll(req.query);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

userRouter.get('/:id', async (req, res) => {
  try {
    const user = await findOne({ id: req.params.id });
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});

userRouter.post('/signup', async (req, res) => {
  try {
    if (!confirmNewPassword(req.body)) throw new HttpError(400, ['passwords do not match']);

    const user = await create(req.body);

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

    const user = await update(id, updateFields);

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
    const user = await destroy(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});