import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addSubCategoryController,
    deleteSubCategoryController,
    getAllSubCategoriesController,
    updateSubCategoryController
} from '../controllers/subCategory.controller.js';

const subCategoryRouter = Router();

subCategoryRouter.post('/add', auth, addSubCategoryController);
subCategoryRouter.get('/get', getAllSubCategoriesController);
subCategoryRouter.put('/update', auth, updateSubCategoryController);
subCategoryRouter.delete('/delete', auth, deleteSubCategoryController);

export default subCategoryRouter;