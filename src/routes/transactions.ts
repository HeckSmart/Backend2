import { Router } from 'express';
import transactionController from '../controllers/transactionController';

const router = Router();


router.get('/lastSwapPrice', transactionController.lastSwapPrice);



export default router;