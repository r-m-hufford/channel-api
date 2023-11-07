import { DataTypes, Model, Sequelize } from "sequelize";
class Article extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public body!: string;
  public authorId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const ArticleAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    field: 'author_id',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
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

export const initArticle = (sequelize: Sequelize) => {
  Article.init(ArticleAttributes, {
    sequelize,
    tableName: 'articles',
  });
};

export { Article };