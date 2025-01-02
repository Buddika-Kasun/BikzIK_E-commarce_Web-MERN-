import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addSubCategoryController,
    getAllSubCategoriesController
} from '../controllers/subCategory.controller.js';

const subCategoryRouter = Router();

subCategoryRouter.post('/add', auth, addSubCategoryController);
subCategoryRouter.get('/get', getAllSubCategoriesController);

export default subCategoryRouter;