import express, { Request, Response } from 'express';
import { confirmNewPassword, hashPassword } from "../utils/password";
import { User } from "../models/user";
import { update } from '../services/user-service';
import { HttpError } from '../middleware/httpError';

interface RequestUser {
  email: string;
}

export const passwordRouter = express.Router();

passwordRouter.post('/reset', async (req: Request, res: Response, next: any) => {
  try {
    if (!(req.user as RequestUser)?.email) {
      throw new HttpError(400, ['Email is required']);
    }
    const { email } = req.user as RequestUser;
    const { password, confirmPassword } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new HttpError(400, ['User not found']);
    }
    const isPasswordConfirmed = confirmNewPassword(password, confirmPassword);
    if (!isPasswordConfirmed) {
      throw new HttpError(400, ['Passwords do not match']);
    }
    const hashedPassword = await hashPassword(password);
    await update(user.id.toString(), { password: hashedPassword });
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
