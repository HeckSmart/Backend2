import { sequelize } from '../database';
import initDriver, { DriverModel } from './Driver';
import initDriverQueries, { DriverQueriesModel } from './DriverQueries';

initDriver(sequelize);
initDriverQueries(sequelize);

export interface Models {
  Driver: typeof DriverModel;
  DriverQueries: typeof DriverQueriesModel;
  sequelize: typeof sequelize;
}

const models: Models = { Driver: DriverModel, DriverQueries: DriverQueriesModel, sequelize };

Object.values(models).forEach((m) => {
  if (m !== sequelize && typeof (m as { associate?: (m: Models) => void }).associate === 'function') {
    (m as { associate: (m: Models) => void }).associate(models);
  }
});

export { DriverModel, DriverQueriesModel, sequelize };
export default models;
