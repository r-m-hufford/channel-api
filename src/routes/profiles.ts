import express from 'express';
import { Profile } from '../models/profile';

export const profileRouter = express.Router();

profileRouter.get('/', (req, res) => {
  res.json('profile');
});
