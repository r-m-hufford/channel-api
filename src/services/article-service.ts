import { Article } from '../models/article';
import { Topic } from '../models/topic';
export const findAll = async (query: any) => {
  try {
    const articles = await Article.findAll({
      attributes: ["id", "author_id", "description", "title", "body", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
      where: query,
      include: [{ model: Topic, as: 'topics', attributes: ["id", "name", "createdAt", "updatedAt"], through: { attributes: [] } }],
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
      include: [{ model: Topic, as: 'topics', attributes: ["id", "name", "createdAt", "updatedAt"], through: { attributes: [] } }],
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
    if (article.topicIds) {
      await newArticle.setTopics(article.topicIds);
      return await findOne({ id: newArticle.id });
    }
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
