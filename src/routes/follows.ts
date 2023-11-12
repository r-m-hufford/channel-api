import express from 'express';
import { getFollowers } from '../services/follow-service';

export const followsRouter = express.Router();

followsRouter.get('/', async (req, res) => {
  try {
    const followers = await getFollowers(req.params.userId);
    res.status(200).json(followers);
  } catch (error) {
    
  }
});

followsRouter.post('/', (req, res) => {
  res.send('Hello, world!');
});

followsRouter.delete('/', (req, res) => {
  res.send('Hello, world!');
});