import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { 
    forgotPasswordController,
    loginUserController,
    logoutUserController,
    registerUserController,
    updateProfileController,
    uploadAvatarController,
    verifyEmailController,
    verifyForgotPasswordOtpController,
} from '../controllers/user.controller.js';

const userRouter = new Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginUserController);
userRouter.get('/logout', auth, logoutUserController);
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatarController);
userRouter.put('/update-user', auth, updateProfileController);
userRouter.post('/forgot-password', forgotPasswordController);
userRouter.post('/verify-forgot-password-otp', verifyForgotPasswordOtpController);

export default userRouter;