import express from 'express';
import { create, destroy, findAll, findOne, update } from '../services/article-service';
import { HttpError } from '../middleware/httpError';

export const articlesRouter = express.Router();

articlesRouter.get('/', async (req, res) => {
  try {
    const articles = await findAll(req.query);
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

articlesRouter.get('/:id', async (req, res) => {
  try {
    const article = await findOne({ id: req.params.id });
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

articlesRouter.post('/', async (req, res) => {
  try {
    const article = await create(req.body);
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

articlesRouter.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateFields = req.body;

    const article = await update(id, updateFields);

    if (!article) {
      throw new HttpError(404, ['Article not found']);
    }

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

articlesRouter.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const article = await destroy(id);

    if (!article) {
      throw new HttpError(404, ['Article not found']);
    }

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
