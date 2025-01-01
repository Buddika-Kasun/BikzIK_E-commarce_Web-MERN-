import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addCategoryController,
    deleteCategoryController,
    getAllCategoriesController,
    updateCategoryController
} from '../controllers/category.controller.js';

const categoryRouter = new Router();

categoryRouter.post('/add', auth, addCategoryController);
categoryRouter.get('/get', getAllCategoriesController);
categoryRouter.put('/update', auth, updateCategoryController);
categoryRouter.delete('/delete', auth, deleteCategoryController);

export default categoryRouter;