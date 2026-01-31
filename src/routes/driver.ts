import { Router } from 'express';
import driverController from '../controllers/driverController';

const router = Router();


router.get('/driverSwapCount', driverController.getDriverSwapCount);

export default router;