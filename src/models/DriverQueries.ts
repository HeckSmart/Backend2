import { Model, DataTypes, Sequelize } from "sequelize";

class DriverQueriesModel extends Model {
  declare id: number;
  declare driverId: string;
  declare language: string | null;
  declare intent: string | null;
  declare confidence: string | null;
  declare failureReason: string | null;
  declare riskTag: string | null;
  declare action: string | null;
  declare summary: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;
}

export const driverQueriesModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  driverId: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: "driverId",
  },
  language: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  intent: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  confidence: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  failureReason: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: "failureReason",
  },
  riskTag: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: "riskTag",
  },
  action: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  summary: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
};

export const driverQueriesModelOptions = {
  tableName: "driverQueries",
  timestamps: true,
  paranoid: true,
  underscored: false,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  deletedAt: "deletedAt",
};

const initDriverQueries = (sequelize: Sequelize): typeof DriverQueriesModel => {
  DriverQueriesModel.init(driverQueriesModelAttributes, {
    sequelize,
    ...driverQueriesModelOptions,
  });
  return DriverQueriesModel;
};

export default initDriverQueries;
export { DriverQueriesModel };
