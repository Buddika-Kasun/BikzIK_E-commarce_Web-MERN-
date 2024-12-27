import { Router } from 'express';
import auth from '../middlewares/auth.js';
import {
    addCategoryController
} from '../controllers/category.controller.js';

const categoryRouter = new Router();

categoryRouter.post('/add', auth, addCategoryController);

export default categoryRouter;