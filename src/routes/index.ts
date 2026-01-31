import { Router } from 'express';
import * as healthController from '../controllers/healthController';
import driverRoutes from './driver';
import driverQueriesRoutes from './driverQueries'
const router = Router();

router.get('/health', healthController.health);
router.get('/ready', healthController.readiness);

router.use('/drivers', driverRoutes);
router.use('/queries', driverQueriesRoutes);

export default router;
