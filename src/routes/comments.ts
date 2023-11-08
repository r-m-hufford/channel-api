import express from 'express';
import { create, findAll, findOne, update } from '../services/comment-service';
import { HttpError } from '../middleware/httpError';

export const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
  try {
    const comments = await findAll(req.query);
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

commentsRouter.get('/:id', async (req, res) => {
  try {
    const comment = await findOne({ id: req.params.id });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

commentsRouter.post('/', async (req, res) => {
  try {
    const comment = await create(req.body);
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

commentsRouter.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateFields = req.body;

    const comment = await update(id, updateFields);

    if (!comment) {
      throw new HttpError(404, ['Comment not found']);
    }

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

commentsRouter.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const comment = await destroy(id);

    if (!comment) {
      throw new HttpError(404, ['Comment not found']);
    }

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});