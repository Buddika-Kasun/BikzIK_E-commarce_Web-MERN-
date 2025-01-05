import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addProductController,
    getProductsController
} from '../controllers/product.controller.js';

const productRouter = new Router();

productRouter.post('/add', auth, addProductController);
productRouter.post('/get', getProductsController);

export default productRouter;
