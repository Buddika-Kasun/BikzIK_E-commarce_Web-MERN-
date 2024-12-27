import { Router } from 'express';
import auth from '../middlewares/auth.js';
import uploadImageController from '../controllers/uploadImage.controller.js';
import upload from '../middlewares/multer.js';

const uploadImageRouter = new Router();

uploadImageRouter.post('/upload', auth, upload.single('image'), uploadImageController);

export default uploadImageRouter;