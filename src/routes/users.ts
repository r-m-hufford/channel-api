import express, {Request, Response } from 'express';
import { confirmNewPassword } from '../utils/password';
import { HttpError } from '../middleware/httpError';
import { generateToken } from '../utils/jwt';
import { create, destroy, findAll, findOne, update } from '../services/user-service';

export const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await findAll(req.query);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

userRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await findOne({ id: req.params.id });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

userRouter.post('/signup', async (req: Request, res: Response) => {
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

userRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updateFields = req.body;

    const user = await update(id, updateFields);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Update successful', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await destroy(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});