import { Sequelize } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mariadb',
    dialectOptions: config.db.dialectOptions,
    pool: config.db.pool,
    logging: config.db.logging,
    define: {
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export const testConnection = async (): Promise<void> => {
  await sequelize.authenticate();
};

export { sequelize };
