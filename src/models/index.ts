import { sequelize } from '../database';
import initDriver, { DriverModel } from './Driver';


initDriver(sequelize);

export interface Models {

  Driver: typeof DriverModel;
  sequelize: typeof sequelize;
}

const models: Models = {  Driver: DriverModel, sequelize };

Object.values(models).forEach((m) => {
  if (m !== sequelize && typeof (m as { associate?: (m: Models) => void }).associate === 'function') {
    (m as { associate: (m: Models) => void }).associate(models);
  }
});

export {  DriverModel, sequelize };
export default models;
