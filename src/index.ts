import app from './app';
import config from './config';
import { sequelize } from './database';

async function start(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    const server = app.listen(config.port, () => {
      console.log(`Server connected and listening on port ${config.port} (${config.env})`);
    });

    const shutdown = (signal: string): void => {
      console.log(`${signal} received, shutting down gracefully`);
      server.close(async () => {
        try {
          await sequelize.close();
          process.exit(0);
        } catch (err) {
          console.error('Error closing database:', err);
          process.exit(1);
        }
      });
      setTimeout(() => process.exit(1), 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
