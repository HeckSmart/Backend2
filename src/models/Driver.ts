import { Model, DataTypes, Sequelize } from "sequelize";

class DriverModel extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare isActive: boolean;
  declare isOnLeave: boolean;
  declare employeeId: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt?: Date | null;
}

export const driverModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  swapCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: 'swapCount'
  },
  isOnLeave: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
};

export const driverModelOptions = {
  tableName: "drivers",
  timestamps: true,
};

const initDriver = (sequelize: Sequelize): typeof DriverModel => {
  DriverModel.init(driverModelAttributes, { sequelize, ...driverModelOptions });
  return DriverModel;
};

export default initDriver;
export { DriverModel };