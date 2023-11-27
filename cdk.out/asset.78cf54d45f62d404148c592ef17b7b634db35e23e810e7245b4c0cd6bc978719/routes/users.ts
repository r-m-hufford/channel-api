import express, {Request, Response } from 'express';
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
    res.status(500).json({ message: 'Server Error' });
  }
});

userRouter.post('/signup', async (req, res) => {
  const { password, confirmPassword } = req.body;
  try {
    if (!confirmNewPassword(password, confirmPassword)) throw new HttpError(400, ['passwords do not match']);

    const user = await create(req.body);

    const tokens = generateToken(user)
    console.log(tokens);
    res.cookie('accessToken', tokens.accessToken, { httpOnly: true, secure: true });
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: true });

    user.refreshToken = tokens.refreshToken;
    await user.save();
    
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
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
    res.status(500).json({ message: 'Server Error' });
  }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    const user = await destroy(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});