import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addProductController,
    getProductsByCategoryController,
    getProductsController
} from '../controllers/product.controller.js';

const productRouter = new Router();

productRouter.post('/add', auth, addProductController);
productRouter.post('/get', getProductsController);
productRouter.post('/get-by-category', getProductsByCategoryController);

export default productRouter;
