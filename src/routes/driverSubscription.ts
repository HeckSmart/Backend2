import { Router } from 'express';
import driverSubscriptionController from '../controllers/driverSubscriptionController';

const router = Router();

// All query: driverId
router.get('/', driverSubscriptionController.getDriverSubscription);
router.get('/details', driverSubscriptionController.getDriverSubscriptionDetails);
router.get('/endDate', driverSubscriptionController.getDriverSubscriptionEndDate);
router.get('/startDate', driverSubscriptionController.getDriverSubscriptionStartDate);
router.get('/price', driverSubscriptionController.getDriverSubscriptionPrice);
router.get('/status', driverSubscriptionController.getDriverSubscriptionStatus);

export default router;
