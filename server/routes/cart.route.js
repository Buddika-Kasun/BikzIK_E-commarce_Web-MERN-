import { Router } from "express";
import auth from '../middlewares/auth.js';
import {
    addToCartController
} from "../controllers/cart.controller.js";

const cartRouter = new Router();

cartRouter.post('/add', auth, addToCartController);

export default cartRouter;