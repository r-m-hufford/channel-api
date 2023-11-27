import express from 'express';
import { assignTopics, create, destroy, findAll, findOne, update } from '../services/topics-service';
import { HttpError } from '../middleware/httpError';

export const topicsRouter = express.Router();

topicsRouter.get('/', async (req, res) => {
  try {
    const topics = await findAll(req.query);
    res.json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

topicsRouter.get('/:id', async (req, res) => {
  try {
    const topic = await findOne({ id: req.params.id });
    res.json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

topicsRouter.post('/', async (req, res) => {
  try {
    const topic = await create(req.body);
    res.json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

topicsRouter.post('/assign-topics', async (req, res) => {
  try {
    const { articleId, topicIds } = req.body;
    const topic = await assignTopics(articleId, topicIds);
    res.json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

topicsRouter.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateFields = req.body;

    const topic = await update(id, updateFields);

    if (!topic) {
      throw new HttpError(404, ['Topic not found']);
    }

    res.json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

topicsRouter.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const topic = await destroy(id);

    if (!topic) {
      throw new HttpError(404, ['Topic not found']);
    }

    res.json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
