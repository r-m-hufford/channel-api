import { Article } from "../models/article";
import { Topic } from "../models/topic";

export const findAll = async (query: any) => {
  try {
    const topics = await Topic.findAll({
      attributes: ["id", "name", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
      where: query,
    });
    return topics;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const findOne = async (query: any) => {
  try {
    const topic = await Topic.findOne({
      attributes: ["id", "name", "createdAt", "updatedAt"],
      where: query,
    });
    return topic;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export const create = async (topic: any) => {
  try {
    const newTopic = await Topic.create(topic);
    return newTopic;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const update = async (id: number, topic: any) => {
  try {
    const updatedTopic = await Topic.update(topic, {
      where: { id },
      returning: true,
    });
    return updatedTopic[1][0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const destroy = async (id: number) => {
  try {
    const deletedTopic = await Topic.destroy({
      where: { id },
    });
    return deletedTopic;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const assignTopics = async (articleId: number, topicIds: number[]) => {
  try {
    const topicPromises = topicIds.map(async (topicId) => {
      const topic = await Topic.findOne({ where: { id: topicId } });
      return topic;
    });

    let topics = await Promise.all(topicPromises);
    topics = topics.filter((topic) => topic !== null);

    const article = await Article.findOne({ where: { id: articleId } });

    if (!article) {
      throw new Error("Article not found");
    }
    if (topics.length === 0) {
      throw new Error("Topics not found");
    }

    if(article && topics.length > 0) {
      await article.addTopics(topics);
    }


    return article;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
