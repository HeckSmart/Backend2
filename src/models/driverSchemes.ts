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
    field: "driverId"
  },
  schemeName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "schemeName"
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "description"
  },
};

export const driverSchemesModelOptions = {
  tableName: "driverSchemes",
  timestamps: true,
  paranoid: true,
  underscored: false,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deletedAt",
};

const initDriverSchemes = (sequelize: Sequelize): typeof DriverSchemesModel => {
  DriverSchemesModel.init(driverSchemesModelAttributes, { sequelize, ...driverSchemesModelOptions });
  return DriverSchemesModel;
};

export default initDriverSchemes;
export { DriverSchemesModel };