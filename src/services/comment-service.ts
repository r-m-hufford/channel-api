import { Comment } from '../models/comment';

export const findAll = async (query: any) => {
  try {
    const comments = await Comment.findAll({
      attributes: ['id', 'body', 'createdAt', 'updatedAt'],
      where: query,
      order: [['createdAt', 'DESC']],
    });
    return comments;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const findOne = async (query: any) => {
  try {
    const comment = await Comment.findOne({
      attributes: ['id', 'body', 'createdAt', 'updatedAt'],
      where: query,
    });
    return comment;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const create = async (body: any) => {
  try {
    const comment = await Comment.create(body);
    return comment;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const update = async (id: number, body: any) => {
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) return null;

    const updatedComment = await comment.update(body);
    return updatedComment;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const destroy = async (id: number) => {
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) return null;

    await comment.destroy();
    return comment;
  } catch (error) {
    console.error(error);
    throw error;
  }
}