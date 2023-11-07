import { Profile } from '../models/profile';

export const findAll = async (query: any) => {
  try {
    const profiles = await Profile.findAll({
      attributes: ['id', 'user_id', 'firstName', 'lastName', 'bio', 'profilePicture', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']],
      where: query,
    });
    return profiles;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export const findOne = async (query: any) => {
  try {
    const profile = await Profile.findOne({
      attributes: ['id', 'user_id', 'firstName', 'lastName', 'bio', 'profilePicture', 'createdAt', 'updatedAt'],
      where: query,
    });
    return profile;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const create = async (profile: any) => {
  try {
    const newProfile = await Profile.create(profile);
    return newProfile;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const update = async (id: number, profile: any) => {
  try {
    const foundProfile = await Profile.findByPk(id);
    if (foundProfile) {
      await foundProfile.update(profile);
      return foundProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const destroy = async (id: number) => {
  try {
    const profile = await Profile.findByPk(id);
    if (profile) {
      await profile.destroy();
      return profile;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

  