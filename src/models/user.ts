import { Model, DataTypes, Sequelize } from 'sequelize';

// Define the User model class
class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

// Define the User model schema
const UserAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

// Create the User model and associate it with the schema
export const initUser = (sequelize: Sequelize): void => {
  User.init(UserAttributes, {
    sequelize,
    modelName: 'User',
    tableName: 'users', // Optional, specify the table name if it's different from the model name
  });
};

// Export the User model
export { User };
