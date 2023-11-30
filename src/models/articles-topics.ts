import { Model, DataTypes, Sequelize } from 'sequelize';
// import { Article } from './article';
// import { Topic } from './topic';

class ArticleTopic extends Model {
  public id!: number;
  public articleId!: number;
  public topicId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const ArticleTopicAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  articleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'articles',
      key: 'id',
    },
    field: 'article_id',
  },
  topicId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'topics',
      key: 'id',
    },
    field: 'topic_id',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'updated_at',
  },
};

export const initArticleTopic = (sequelize: Sequelize) => {
  ArticleTopic.init(ArticleTopicAttributes, {
    sequelize,
    modelName: 'ArticleTopic',
    tableName: 'articles_topics',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
};

export { ArticleTopic };