
import {
    DataTypes,
    Model,
    Sequelize,
  } from 'sequelize';

class driverSubscriptionModel extends Model {
    declare id: number;
    declare driverId: string;
    declare dskCenterName: string;
    declare startDate: Date;
    declare endDate: Date;
    declare subscriptionPrice: number;
    declare status: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deletedAt?: Date | null;
}

export const driverSubscriptionModelAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    driverId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subscriptionName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    subscriptionPrice: {
        type: DataTypes.NUMBER,
        allowNull: false,
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
};

export const driverSubscriptionModelOptions = {
    tableName: "driverSubscription",
    timestamps: true,
    paranoid: true,
    deletedAt: "deletedAt",
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
};

const initDriverSubscription = (sequelize: Sequelize): typeof driverSubscriptionModel => {
    driverSubscriptionModel.init(driverSubscriptionModelAttributes, { sequelize, ...driverSubscriptionModelOptions });
    return driverSubscriptionModel;
};

export default initDriverSubscription;
export { driverSubscriptionModel };