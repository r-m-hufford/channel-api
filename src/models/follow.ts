import { DataTypes, Model, Sequelize } from 'sequelize';

class Follow extends Model{
  id!: number;
  followerId!: number;
  followeeId!: number;
}

const FollowAttributes = {
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'follower_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  followeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'followee_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
};

export const initFollow = (sequelize: Sequelize) => {
  Follow.init(FollowAttributes, {
    sequelize,
    modelName: 'Follow',
    tableName: 'follows',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
};

export { Follow };