import {
  DataTypes,
  Model,
  Sequelize,
} from 'sequelize';

class DskModel extends Model {
  declare id: string;
  declare name: string;
  declare address: string;
  declare partnerId: string;
  declare days: string;
  declare startTime: string;
  declare endTime: string;
  declare latitude: number;
  declare longitude: number;
  declare noOfBatteries: number;
  declare status: string;
  declare stateName: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date | null;
}

export const dskModelAttributes = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  partnerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  days: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  endTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
  noOfBatteries: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  zoneId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stateName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export const dskModelOptions = {
  tableName: "dsk_centers",
  timestamps: true,
  paranoid: true,
  deletedAt: "deletedAt",
};

const initDskCenter = (sequelize: Sequelize): typeof DskModel => {
  DskModel.init(dskModelAttributes, { sequelize, ...dskModelOptions });
  return DskModel;
};

export default initDskCenter;
export { DskModel };