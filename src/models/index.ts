import { sequelize } from '../database';
import initDriver, { DriverModel } from './Driver';
import initDriverQueries, { DriverQueriesModel } from './DriverQueries';
import Partner from './partners';
import initDskCenter, { DskCenterModel } from './DskCenter';
import initInactivityCenter, { InactivityCenterModel } from './InactivityCenter';

initDriver(sequelize);
initDriverQueries(sequelize);
Partner.initModel(sequelize);
initDskCenter(sequelize);
initInactivityCenter(sequelize);

export interface Models {
  Driver: typeof DriverModel;
  DriverQueries: typeof DriverQueriesModel;
  Partner: typeof Partner;
  DskCenter: typeof DskCenterModel;
  InactivityCenter: typeof InactivityCenterModel;
  sequelize: typeof sequelize;
}

const models: Models = {
  Driver: DriverModel,
  DriverQueries: DriverQueriesModel,
  Partner,
  DskCenter: DskCenterModel,
  InactivityCenter: InactivityCenterModel,
  sequelize,
};

Object.values(models).forEach((m) => {
  if (m !== sequelize && typeof (m as { associate?: (m: Models) => void }).associate === 'function') {
    (m as { associate: (m: Models) => void }).associate(models);
  }
});

export { DriverModel, DriverQueriesModel, Partner, DskCenterModel, InactivityCenterModel, sequelize };
export default models;
