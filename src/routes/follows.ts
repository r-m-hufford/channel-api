import express from 'express';

export const followsRouter = express.Router();

followsRouter.get('/', (req, res) => {
  res.send('Hello, world!');
});

followsRouter.post('/', (req, res) => {
  res.send('Hello, world!');
});

followsRouter.delete('/', (req, res) => {
  res.send('Hello, world!');
});