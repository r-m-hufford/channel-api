import express, { Request, Response } from 'express';
import { getFollowers } from '../services/follow-service';

export const followsRouter = express.Router();

followsRouter.get('/followers/{userId}', async (req: Request, res: Response) => {
  try {
    const followers = await getFollowers(req.params.userId);
    res.status(200).json(followers);
  } catch (error) {
    
  }
});

followsRouter.post('/follow', (/*req: Request,*/ res: Response) => {
  res.send('Hello, world!');
});

followsRouter.delete('/unfollow', (/*req: Request,*/ res: Response) => {
  res.send('Hello, world!');
});