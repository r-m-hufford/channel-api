import {Model, DataTypes, Sequelize} from 'sequelize';

class RevokedToken extends Model {
  public revokedTokenId!: number;
  public userId!: number;
  public token!: string;
  public iat!: number;
  public expiresAt!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

const RevokedTokenAttributes = {
  revokedTokenId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'revoked_token_id',
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
    type: DataTypes.DATE,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
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

export const initRevokedToken = (sequelize: Sequelize): void => {
  RevokedToken.init(RevokedTokenAttributes, {
    sequelize,
    modelName: 'RevokedToken',
    tableName: 'revoked_tokens',
  });
};

export { RevokedToken }