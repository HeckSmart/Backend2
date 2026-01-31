import { Router } from 'express';
import driverSchemeController from '../controllers/driverSchemeController';

const router = Router();

// List schemes for a driver (query: driverId)
router.get('/', driverSchemeController.getDriverSchemes);

// Get scheme details for a driver (query: driverId)
router.get('/details', driverSchemeController.getDriverSchemeDetails);
router.get('/schemeName', driverSchemeController.getDriverSchemeName);
router.get('/description', driverSchemeController.getDriverSchemeDescription);

// Get one scheme by id (param: id)
router.get('/:id', driverSchemeController.getDriverSchemeById);

export default router;
