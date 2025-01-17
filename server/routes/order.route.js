import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addOrderController,
    getOrdersController
} from '../controllers/order.controller.js';
import { get } from 'mongoose';

const orderRouter = new Router();

orderRouter.post('/add', auth, addOrderController);
orderRouter.get('/get', auth, getOrdersController);

export default orderRouter;