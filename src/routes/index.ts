import { Router } from 'express';
import * as healthController from '../controllers/healthController';
import driverRoutes from './driver';
import driverQueriesRoutes from './driverQueries';
import driverSchemesRoutes from './driverSchemes';
import driverSubscriptionRoutes from './driverSubscription';
import transactionsRoutes from './transactions';

const router = Router();

router.get('/health', healthController.health);
router.get('/ready', healthController.readiness);

router.use('/drivers', driverRoutes);
router.use('/queries', driverQueriesRoutes);
router.use('/schemes', driverSchemesRoutes);
router.use('/subscriptions', driverSubscriptionRoutes);
router.use('/transactions', transactionsRoutes);

export default router;
