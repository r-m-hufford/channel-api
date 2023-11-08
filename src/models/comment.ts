import { DataTypes, Model, Sequelize } from 'sequelize';

class Comment extends Model {
  public id!: number;
  public articleId!: number;
  public userId!: number;
  public body!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const CommentAttributes = {
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    field: 'user_id',
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
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

export const initComment = (sequelize: Sequelize) => {
  Comment.init(CommentAttributes, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
  });
}