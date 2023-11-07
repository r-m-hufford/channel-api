import { Model, DataTypes, Sequelize } from 'sequelize';

class Profile extends Model {
  public id!: number;
  public userId!: number;
  public firstName!: string;
  public lastName!: string;
  public bio!: string;
  public profilePicture!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const ProfileAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  firstName: {
    type: DataTypes.STRING,
    field: 'first_name',
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    field: 'last_name',
    allowNull: false,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profilePicture: {
    type: DataTypes.STRING,
    field: 'profile_picture',
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

export const initProfile = (sequelize: Sequelize) => {
  Profile.init(ProfileAttributes, {
    sequelize,
    modelName: 'Profile',
    tableName: 'profiles',
  });
  };

export { Profile };