import express from 'express';
import { Profile } from '../models/profile';

export const profileRouter = express.Router();

profileRouter.get('/', async (req, res) => {
  try {
    const profiles = await Profile.findAll(req.query);
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

profileRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

profileRouter.post('/', async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

profileRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id);
    if (profile) {
      await profile.update(req.body);
      res.json(profile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    
  }
});

profileRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id);
    if (profile) {
      await profile.destroy();
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

