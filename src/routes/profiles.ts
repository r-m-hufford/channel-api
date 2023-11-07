import express from 'express';
import { Profile } from '../models/profile';
import { create, destroy, findAll, findOne, update } from '../services/profile-service';

export const profileRouter = express.Router();

profileRouter.get('/', async (req, res) => {
  try {
    const profiles = await findAll(req.query);
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

profileRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await findOne({ id: id });
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

profileRouter.post('/', async (req, res) => {
  try {
    const profile = await create(req.body);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

profileRouter.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const profile = await update(id, req.body);

    if (!profile) {
      res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

profileRouter.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const profile = await destroy(id);

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

