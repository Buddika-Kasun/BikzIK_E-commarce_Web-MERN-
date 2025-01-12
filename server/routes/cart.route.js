import { Router } from "express";
import auth from '../middlewares/auth.js';
import {
    addToCartController,
    getCartItemController
} from "../controllers/cart.controller.js";

const cartRouter = new Router();

cartRouter.post('/add', auth, addToCartController);
cartRouter.get('/get', auth, getCartItemController);

export default cartRouter;