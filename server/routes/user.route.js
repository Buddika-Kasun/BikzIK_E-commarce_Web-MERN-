import { Router } from 'express';
import { 
    loginUserController,
    logoutUserController,
    registerUserController,
    uploadAvatarController,
    verifyEmailController,
} from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';

const userRouter = new Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginUserController);
userRouter.get('/logout', auth, logoutUserController);
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatarController);

export default userRouter;