import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addCategoryController,
    getAllCategoriesController
} from '../controllers/category.controller.js';

const categoryRouter = new Router();

categoryRouter.post('/add', auth, addCategoryController);
categoryRouter.get('/get', getAllCategoriesController);

export default categoryRouter;