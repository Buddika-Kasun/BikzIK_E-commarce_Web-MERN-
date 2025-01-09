import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addProductController,
    getProductsByCategoryAndSubcategoryController,
    getProductsByCategoryController,
    getProductsController
} from '../controllers/product.controller.js';

const productRouter = new Router();

productRouter.post('/add', auth, addProductController);
productRouter.post('/get', getProductsController);
productRouter.post('/get-by-category', getProductsByCategoryController);
productRouter.post('/get-by-category-and-subcategory', getProductsByCategoryAndSubcategoryController);

export default productRouter;
