import { Router } from 'express';
import { getSales, createSale, deleteSale, clearSales, } from '../controllers/saleController.js';
const router = Router();
router.get('/sales', getSales);
router.post('/sales', createSale);
router.delete('/sales/:id', deleteSale);
router.delete('/sales', clearSales);
export default router;
//# sourceMappingURL=saleRoutes.js.map