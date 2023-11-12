import { Model, DataTypes, Sequelize, HasManyGetAssociationsMixin } from 'sequelize';
import bcrypt from 'bcrypt';
import { validatePassword } from '../utils/password';
import { Article } from './article';
import { Profile } from './profile';
import { Comment } from './comment';
import { Follow } from './follow';

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public refreshToken!: string;
  public googleId!: string;
  public githubId!: string;

  async validPassword(password: string) {
    return await validatePassword(password, this);
  }
  public getArticles!: HasManyGetAssociationsMixin<Article>;
}

const UserAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  googleId: {
    type: DataTypes.STRING,
    field: 'google_id',
    allowNull: true,
    unique: true
  },
  githubId: {
    type: DataTypes.STRING,
    field: 'github_id',
    allowNull: true,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  refreshToken: {
    type: DataTypes.STRING,
    field: 'refresh_token',
    allowNull: true,
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

export const initUser = (sequelize: Sequelize): void => {
  User.init(UserAttributes, {
    hooks: {
      beforeCreate: (user: User) => {
        if (user.password) {
          user.password = bcrypt.hashSync(`${user.password}${process.env.AUTH_PEPPER}`, bcrypt.genSaltSync(10));
        }
      }
    },
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
};

export const associateUser = () => {
  User.hasMany(Article, {
    sourceKey: 'id',
    foreignKey: 'authorId',
    as: 'articles',
  });

  User.hasMany(Comment, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'comments',
  });

  User.hasOne(Profile, {
    foreignKey: 'userId',
    as: 'profile',
  });

  User.belongsToMany(Follow, {
    through: 'follows',
    as: 'followers',
    foreignKey: 'followeeId',
    otherKey: 'followerId',
  });

  User.belongsToMany(Follow, {
    through: 'follows',
    as: 'followees',
    foreignKey: 'followerId',
    otherKey: 'followeeId',
  });
}

export { User };
