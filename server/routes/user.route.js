import { Router } from 'express';
import { loginUserController, registerUserController, verifyEmailController } from '../controllers/user.controller.js';

const userRouter = new Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginUserController);

export default userRouter;