import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addOrderController
} from '../controllers/order.controller.js';

const orderRouter = new Router();

orderRouter.post('/add', auth, addOrderController);

export default orderRouter;