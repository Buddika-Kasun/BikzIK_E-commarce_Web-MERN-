import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
    addAddressController,
    getAddressesController
} from "../controllers/address.controller.js";

const addressRouter = new Router();

addressRouter.post('/add', auth, addAddressController);
addressRouter.get('/get', auth, getAddressesController);

export default addressRouter;