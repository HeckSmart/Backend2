import dotenv from 'dotenv';
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

export interface Config {
  env: string;
  isProd: boolean;
  port: number;
  db: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
    pool: {
      min: number;
      max: number;
      acquire: number;
      idle: number;
    };
    dialectOptions: Record<string, number>;
    logging: boolean | ((msg: string) => void);
  };
  cors: { origin: string };
}

const config: Config = {
  env: process.env.NODE_ENV || 'development',
  isProd,
  port: parseInt(process.env.PORT ?? '', 10) || 3000,

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '', 10) || 3306,
    name: process.env.DB_NAME || 'backend_db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    pool: {
      min: parseInt(process.env.DB_POOL_MIN ?? '', 10) || 0,
      max: parseInt(process.env.DB_POOL_MAX ?? '', 10) || 5,
      acquire: parseInt(process.env.DB_POOL_ACQUIRE ?? '', 10) || 30000,
      idle: parseInt(process.env.DB_POOL_IDLE ?? '', 10) || 10000,
    },
    dialectOptions: isProd ? { connectTimeout: 10000 } : {},
    logging: isProd ? false : (msg: string) => console.debug(msg),
  },

  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
};

export default config;
