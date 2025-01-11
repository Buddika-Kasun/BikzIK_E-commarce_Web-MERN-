import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addProductController,
    deleteProductController,
    getProductByIdController,
    getProductsByCategoryAndSubcategoryController,
    getProductsByCategoryController,
    getProductsController,
    updateProductController
} from '../controllers/product.controller.js';
import { admin } from '../middlewares/admin.js';

const productRouter = new Router();

productRouter.post('/add', auth, admin, addProductController);
productRouter.post('/get', getProductsController);
productRouter.post('/get-by-category', getProductsByCategoryController);
productRouter.post('/get-by-category-and-subcategory', getProductsByCategoryAndSubcategoryController);
productRouter.post('/get-by-id', getProductByIdController);
productRouter.put('/update', auth, admin, updateProductController);
productRouter.delete('/delete', auth, admin, deleteProductController);

export default productRouter;
