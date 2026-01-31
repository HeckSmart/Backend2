import { Router } from 'express';
import driverQueriesController from '../controllers/driverQueriesController';

const router = Router();


router.get('/', driverQueriesController.getDriverQueries);

export default router;