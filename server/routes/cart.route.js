import { Router } from "express";
import auth from '../middlewares/auth.js';
import {
    addToCartController,
    deleteCartItemController,
    getCartItemController,
    updateCartItemQtyController
} from "../controllers/cart.controller.js";

const cartRouter = new Router();

cartRouter.post('/add', auth, addToCartController);
cartRouter.get('/get', auth, getCartItemController);
cartRouter.put('/update-qty', auth, updateCartItemQtyController);
cartRouter.delete('/delete', auth, deleteCartItemController);

export default cartRouter;