import { User } from "../models/user";

export const findAll = async (query: any) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
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
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
      where: query,
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