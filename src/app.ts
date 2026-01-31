import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin:
      config.cors.origin === '*'
        ? true
        : config.cors.origin.split(',').map((o) => o.trim()),
    optionsSuccessStatus: 200,
  })
);
app.use(morgan(config.isProd ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    version: '1.0.0',
    docs: '/health, /ready, /users',
  });
});

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
