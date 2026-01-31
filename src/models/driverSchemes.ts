import { Model, DataTypes, Sequelize } from "sequelize";

class DriverSchemesModel extends Model {
  declare id: number;
  declare driverId: string;
  declare schemeName: string;
  declare description: string;
  declare createdAt: string;
  declare updatedAt: string;
  declare deletedAt?: string | null;
}

export const driverSchemesModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  driverId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schemeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
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
};

export const driverSchemesModelOptions = {
  tableName: "driverSchemes",
  timestamps: true,
  paranoid: true,
  deletedAt: "deletedAt",
};

const initDriverSchemes = (sequelize: Sequelize): typeof DriverSchemesModel => {
  DriverSchemesModel.init(driverSchemesModelAttributes, { sequelize, ...driverSchemesModelOptions });
  return DriverSchemesModel;
};

export default initDriverSchemes;
export { DriverSchemesModel };