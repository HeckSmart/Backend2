/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  DataTypes,
  Model,
  Optional,
  Sequelize,
} from 'sequelize';

export enum PartnerStatus {
  yetToStart = 'yetToStart',
  active = 'active',
  left = 'left',
}

export enum PartnerTypeOfIndividual {
  company = 'company',
  individual = 'individual',
}

export enum PartnerStationType {
  smartStation = 'smartStation',
  shopInShop = 'shopInShop',
  parking = 'parking',
  standaloneShop = 'standaloneShop',
  partnerships = 'partnerships',
}

export type TPartnerAddress = {
  city?: string;
  state?: string;
  addressLine?: string;
  addreseeName?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  landmark?: string | null;
  pincode?: number;
};

export type TPartnerAttributes = {
  id: string;
  name: string;
  nameHindi?: string | null;
  address?: string | TPartnerAddress | null;
  picture?: string | null;
  businessType: string;
  startTime: string;
  endTime: string;
  latitude: number;
  longitude: number;
  comment?: string | null;
  status: PartnerStatus;
  noOfBatteries: number;
  deployedBatteries: number;
  partnerType: string;
  typeOfIndividual: PartnerTypeOfIndividual;
  stationType?: PartnerStationType | null;
  liveDate?: string | null;
  isActiveDsk: boolean;
  isAllowedToInactivateDrivers: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

type TPartnerInputAttributes = Optional<
  TPartnerAttributes,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'noOfBatteries'
  | 'deployedBatteries'
  | 'status'
  | 'isActiveDsk'
  | 'isAllowedToInactivateDrivers'
>;

function parseJson<T>(val: string | object | null): T | null {
  if (val == null) return null;
  if (typeof val === 'object') return val as T;
  try {
    return JSON.parse(val as string) as T;
  } catch {
    return null;
  }
}

class Partner
  extends Model<TPartnerAttributes, TPartnerInputAttributes>
  implements TPartnerAttributes {
  public id!: string;
  public name!: string;
  public nameHindi?: string | null;
  public address?: string | TPartnerAddress | null;
  public picture?: string | null;
  public businessType!: string;
  public startTime!: string;
  public endTime!: string;
  public latitude!: number;
  public longitude!: number;
  public comment?: string | null;
  public status!: PartnerStatus;
  public noOfBatteries!: number;
  public deployedBatteries!: number;
  public partnerType!: string;
  public typeOfIndividual!: PartnerTypeOfIndividual;
  public stationType?: PartnerStationType | null;
  public liveDate?: string | null;
  public isActiveDsk!: boolean;
  public isAllowedToInactivateDrivers!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt?: Date | null;

  static initModel(sequelize: Sequelize) {
    return this.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nameHindi: {
          type: DataTypes.TEXT,
          defaultValue: null,
          allowNull: true,
        },
        partnerType: {
          type: DataTypes.STRING,
          defaultValue: 'partnerStation',
          allowNull: false,
        },
        address: {
          type: DataTypes.JSON,
          allowNull: true,
          get() {
            return parseJson<TPartnerAddress>(this.getDataValue('address') as string);
          },
        },
        picture: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        businessType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        startTime: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        endTime: {
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
        comment: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM,
          values: Object.values(PartnerStatus),
          allowNull: false,
          defaultValue: PartnerStatus.yetToStart,
        },
        noOfBatteries: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        deployedBatteries: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        typeOfIndividual: {
          type: DataTypes.ENUM,
          values: Object.values(PartnerTypeOfIndividual),
          allowNull: false,
          defaultValue: PartnerTypeOfIndividual.individual,
        },
        stationType: {
          type: DataTypes.ENUM,
          values: Object.values(PartnerStationType),
          allowNull: true,
        },
        liveDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        isActiveDsk: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        isAllowedToInactivateDrivers: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
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
      },
      {
        sequelize,
        modelName: 'partners',
        paranoid: true,
        deletedAt: 'deletedAt',
        indexes: [
          {
            type: 'FULLTEXT',
            name: 'partner_id_search_idx',
            fields: ['id'],
          },
        ],
      },
    );
  }
}

export default Partner;
