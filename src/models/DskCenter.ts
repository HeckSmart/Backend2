import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type DskCenterAttributes = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type DskCenterInputAttributes = Optional<DskCenterAttributes, 'id' | 'createdAt' | 'updatedAt' | 'address'>;

class DskCenterModel extends Model<DskCenterAttributes, DskCenterInputAttributes> implements DskCenterAttributes {
  public id!: number;
  public name!: string;
  public latitude!: number;
  public longitude!: number;
  public address!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const dskCenterAttributes = {
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

const initDskCenter = (sequelize: Sequelize): typeof DskCenterModel => {
  DskCenterModel.init(dskCenterAttributes, {
    sequelize,
    tableName: 'dsk_centers',
    timestamps: true,
    underscored: true,
  });
  return DskCenterModel;
};

export default initDskCenter;
export { DskCenterModel };
