import { Article } from "../models/article";
import { Profile } from "../models/profile";
import { User } from "../models/user";

export const findOrCreateGithubUser = async (profile: any) => {
  try {
    const user = await User.findOne({
      attributes: ["id", "username", "email", "googleId", "createdAt", "updatedAt"],
      where: { email: profile._json.email }
    });

    if (user) {
      return user;
    }
    
    const newUser = await User.create({
      username: profile._json.name,
      email: profile._json.email,
      googleId: profile.id
    });

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export const findOrCreateGoogleUser = async (profile: any) => {
  try {
    const user = await User.findOne({
      attributes: ["id", "username", "email", "googleId", "createdAt", "updatedAt"],
      where: { email: profile._json.email }
    });

    if (user) {
      return user;
    }
    
    const newUser = await User.create({
      username: profile._json.name,
      email: profile._json.email,
      googleId: profile.id
    });

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const findAll = async (query: any) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
      where: query,
    });
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const findOne = async (query: any) => {
  try {
    const user = await User.findOne({
      attributes: ["id", "username", "email", "createdAt", "updatedAt"],
      where: query,
      include: [
        { model: Profile, as: 'profile', attributes: ["id", "firstName", "lastName", "bio"] },
        { model: Article, as: 'articles', attributes: ["id", "author_id", "description", "title", "body", "createdAt", "updatedAt"]}
      ],
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const create = async (user: any) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const update = async (id: string, updateFields: any) => {
  try {
    const user = await User.update(updateFields, {
      where: { id }
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const destroy = async (id: string) => {
  try {
    const user = await User.destroy({
      where: { id }
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}