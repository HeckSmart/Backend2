import {
    DataTypes,
    Model,
    Sequelize,
  } from 'sequelize';
  

class TransactionsModel extends Model {
    declare id: number;
    declare batteriesReceived: string;
    declare batteriesIssued: string;
    declare vehicleType: string;
    declare swapPrice: number;
    declare discount: number;
    declare date: Date;
    declare driverId: string;
    declare partnerId: string;
    declare status: string;
    declare penalty: number;
    declare pointsUsed: number;
    declare createdBy: string;
    declare serviceCharge: number;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deletedAt: Date;
}


export const transactionsModelAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    batteriesReceived: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    batteriesIssued: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    swapPrice: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    discount: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    driverId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    partnerId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    penalty: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    pointsUsed: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    serviceCharge: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
};

export const transactionsModelOptions = {
    tableName: "transactions",
    timestamps: true,
    paranoid: true,
    deletedAt: "deletedAt",
};

const initTransactions = (sequelize: Sequelize): typeof TransactionsModel => {
    TransactionsModel.init(transactionsModelAttributes, { sequelize, ...transactionsModelOptions });
    return TransactionsModel;
};

export default initTransactions;
export { TransactionsModel };