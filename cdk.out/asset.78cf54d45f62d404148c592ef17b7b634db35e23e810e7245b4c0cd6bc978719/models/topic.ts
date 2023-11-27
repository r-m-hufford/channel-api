import { DataTypes, Model, Sequelize } from 'sequelize';
import { Article } from '../models/article';

class Topic extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const TopicAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
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

export const initTopic = (sequelize: Sequelize): void => {
  Topic.init(TopicAttributes, {
    sequelize,
    modelName: 'Topic',
    tableName: 'topics',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
}

export const associateTopic = () => {
  Topic.belongsToMany(Article, {
    through: 'articles_topics',
    as: 'articles',
    foreignKey: 'topic_id',
  });
}

export { Topic };