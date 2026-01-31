import { Router } from 'express';
import transactionController from '../controllers/transactionController';

const router = Router();


router.get('/lastSwapPrice', transactionController.lastSwapPrice);

router.get('/lastSwapPartnerId', transactionController.getLastSwapPartnerId);

router.get('/lastSwapHistoryInvoice', transactionController.getLastSwapHistoryInvoice);

router.get('/lastBatteryIssued', transactionController.getLastBatteryIssued);

router.get('/swapHistoryByDateRange', transactionController.getSwapHistoryByDateRange);
export default router;