import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public googleId!: string;
  public githubId!: string;

  validPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
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
  name: {
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
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
};

export { User };
