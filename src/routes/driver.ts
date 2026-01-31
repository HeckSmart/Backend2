import { Router } from 'express';
import driverController from '../controllers/driverController';
import * as locationController from '../controllers/locationController';

const router = Router();

router.get('/driverSwapCount', driverController.getDriverSwapCount);
router.get('/onboarding/status', driverController.getDriverOnboardingData);
router.get('/details', driverController.getDriverDetails);

// Nearest to driver location (query: latitude, longitude; optional: limit, radiusKm)
router.get('/nearest/partner-stations', locationController.getNearestPartnerStations);
router.get('/nearest/dsk-centers', locationController.getNearestDskCenters);
router.get('/nearest/inactivity-centers', locationController.getNearestInactivityCenters);

export default router;