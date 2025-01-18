import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addOrderController,
    getAllOrdersController,
    getOrdersController,
    updateOrderStatusController
} from '../controllers/order.controller.js';
import { admin } from '../middlewares/admin.js';

const orderRouter = new Router();

orderRouter.post('/add', auth, addOrderController);
orderRouter.get('/get', auth, getOrdersController);
orderRouter.get('/get-all', auth, admin, getAllOrdersController);
orderRouter.put('/update-status', auth, admin, updateOrderStatusController);

export default orderRouter;