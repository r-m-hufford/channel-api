import { Article } from '../models/article';
export const findAll = async (query: any) => {
  try {
    const articles = await Article.findAll({
      attributes: ["id", "author_id", "description", "title", "body", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
      where: query,
    });
    return articles;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const findOne = async (query: any) => {
  try {
    const article = await Article.findOne({
      attributes: ["id", "author_id", "description", "title", "body", "createdAt", "updatedAt"],
      where: query,
    });
    return article;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const create = async (article: any) => {
  try {
    const newArticle = await Article.create(article);
    return newArticle;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const update = async (id: number, article: any) => {
  try {
    const updatedArticle = await Article.update(article, {
      where: { id },
      returning: true,
    });
    return updatedArticle[1][0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const destroy = async (id: number) => {
  try {
    const deletedArticle = await Article.destroy({
      where: { id },
    });
    return deletedArticle;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
