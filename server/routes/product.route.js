import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addProductController
} from '../controllers/product.controller.js';

const productRouter = new Router();

productRouter.post('/add', auth, addProductController);

export default productRouter;
