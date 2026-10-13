import { Router } from 'express';
import {
  getSales,
  createSale,
  seedSales,
  deleteSale,
  clearSales,
} from '../controllers/saleController.ts';

const router = Router();

router.get('/sales', getSales);
router.post('/sales', createSale);
router.post('/sales/seed', seedSales);
router.delete('/sales/:id', deleteSale);
router.delete('/sales', clearSales);

export default router;