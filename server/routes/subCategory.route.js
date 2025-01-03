import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addSubCategoryController,
    getAllSubCategoriesController,
    updateSubCategoryController
} from '../controllers/subCategory.controller.js';

const subCategoryRouter = Router();

subCategoryRouter.post('/add', auth, addSubCategoryController);
subCategoryRouter.get('/get', getAllSubCategoriesController);
subCategoryRouter.put('/update', updateSubCategoryController);

export default subCategoryRouter;