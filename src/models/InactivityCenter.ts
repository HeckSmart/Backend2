import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type InactivityCenterAttributes = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type InactivityCenterInputAttributes = Optional<InactivityCenterAttributes, 'id' | 'createdAt' | 'updatedAt' | 'address'>;

class InactivityCenterModel extends Model<InactivityCenterAttributes, InactivityCenterInputAttributes> implements InactivityCenterAttributes {
  public id!: number;
  public name!: string;
  public latitude!: number;
  public longitude!: number;
  public address!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const inactivityCenterAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
};

const initInactivityCenter = (sequelize: Sequelize): typeof InactivityCenterModel => {
  InactivityCenterModel.init(inactivityCenterAttributes, {
    sequelize,
    tableName: 'inactivity_centers',
    timestamps: true,
    underscored: true,
  });
  return InactivityCenterModel;
};

export default initInactivityCenter;
export { InactivityCenterModel };
