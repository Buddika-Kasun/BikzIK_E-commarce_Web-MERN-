import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addProductController,
    getProductByIdController,
    getProductsByCategoryAndSubcategoryController,
    getProductsByCategoryController,
    getProductsController
} from '../controllers/product.controller.js';

const productRouter = new Router();

productRouter.post('/add', auth, addProductController);
productRouter.post('/get', getProductsController);
productRouter.post('/get-by-category', getProductsByCategoryController);
productRouter.post('/get-by-category-and-subcategory', getProductsByCategoryAndSubcategoryController);
productRouter.post('/get-by-id', getProductByIdController);

export default productRouter;
