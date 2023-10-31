import {Model, DataTypes, Sequelize} from 'sequelize';

class RevokedToken extends Model {
  public revokedTokenId!: number;
  public userId!: number;
  public token!: string;
  public iat!: string;
  public expiresAt!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

const RevokedTokenAttributes = {
  revokedTokenId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  iat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'expires_at',
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