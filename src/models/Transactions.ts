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
        field: 'batteriesReceived',
    },
    batteriesIssued: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'batteriesIssued',
    },
    vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'vehicleType',
    },
    swapPrice: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'swapPrice',
        get(this: TransactionsModel): number | null {
            const value = this.getDataValue('swapPrice') as number | null;
            return value != null ? value / 100 : value;
        }
    },
    discount: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'discount',
        get(this: TransactionsModel): number | null {
            const value = this.getDataValue('discount') as number | null;
            return value != null ? value / 100 : value;
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date',
    },
    driverId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'driverId',
    },
    partnerId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'partnerId',
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'status',
    },
    penalty: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'penalty',
        get(this: TransactionsModel): number | null {
            const value = this.getDataValue('penalty') as number | null;
            return value != null ? value / 100 : value;
        }
    },
    pointsUsed: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'pointsUsed',
        get(this: TransactionsModel): number | null {
            const value = this.getDataValue('pointsUsed') as number | null;
            return value != null ? value / 100 : value;
        }
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'createdBy',
    },
    serviceCharge: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'serviceCharge',
        get(this: TransactionsModel): number | null {
            const value = this.getDataValue('serviceCharge') as number | null;
            return value != null ? value / 100 : value;
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'createdAt',
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updatedAt',
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deletedAt',
    },
};

export const transactionsModelOptions = {
    tableName: "transactions",
    timestamps: true,
    paranoid: true,
    deletedAt: "deletedAt",
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
};

const initTransactions = (sequelize: Sequelize): typeof TransactionsModel => {
    TransactionsModel.init(transactionsModelAttributes, { sequelize, ...transactionsModelOptions });
    return TransactionsModel;
};

export default initTransactions;
export { TransactionsModel };