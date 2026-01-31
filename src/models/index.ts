import { sequelize } from '../database';
import initDriver, { DriverModel } from './Driver';
import initDriverQueries, { DriverQueriesModel } from './DriverQueries';
import Partner from './partners';
import initDskCenter, { DskModel } from './DskCenter';
import initInactivityCenter, { InactivityCenterModel } from './InactivityCenter';
import { TransactionsModel } from './Transactions';
import initDriverSchemes, { DriverSchemesModel } from './driverSchemes';

initDriver(sequelize);
initDriverQueries(sequelize);
Partner.initModel(sequelize);
initDskCenter(sequelize);
initInactivityCenter(sequelize);
initDriverSchemes(sequelize);
export interface Models {
  Driver: typeof DriverModel;
  DriverQueries: typeof DriverQueriesModel;
  Partner: typeof Partner;
  DskCenter: typeof DskModel;
  InactivityCenter: typeof InactivityCenterModel;
  Transactions: typeof TransactionsModel;
  DriverSchemes: typeof DriverSchemesModel;
  sequelize: typeof sequelize;
}

const models: Models = {
  Driver: DriverModel,
  DriverQueries: DriverQueriesModel,
  Partner,
  DskCenter: DskModel,
  InactivityCenter: InactivityCenterModel,
  Transactions: TransactionsModel,
  DriverSchemes: DriverSchemesModel,
  sequelize,
};

Object.values(models).forEach((m) => {
  if (m !== sequelize && typeof (m as { associate?: (m: Models) => void }).associate === 'function') {
    (m as { associate: (m: Models) => void }).associate(models);
  }
});

export { DriverModel, DriverQueriesModel, Partner, DskModel, InactivityCenterModel, TransactionsModel, DriverSchemesModel, sequelize };
export default models;
