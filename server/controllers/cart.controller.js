import CartProductModel from "../models/cartProduct.model.js";
import UserModel from "../models/user.model.js";


// Add to cart controller
export const addToCartController = async(req, res) => {
    try {

        const userId = req.userId;
        const { productId } = req.body;

        if(!productId) {
            return res.status(400).json({
                message: "Please provide productId",
                error: true,
                success: false,
            });
        }

        const checkItemCart = await CartProductModel.findOne({
            userId: userId,
            productId: productId,
        });

        if(checkItemCart) {
            return res.status(400).json({
                message: "Product already exists in the cart",
                error: true,
                success: false,
            });
        }

        const cartItem = new CartProductModel({
            userId: userId,
            productId: productId,
            quantity: 1,
        });

        const save = await cartItem.save();

        const updateUserCart = await UserModel.updateOne(
            { _id: userId },
            { $push: { shopping_cart: save._id } },
        );

        return res.json({
            message: "Product added to cart successfully",
            error: false,
            success: true,
            data: save,
        });

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Get get cart item controller
export const getCartItemController = async(req, res) => {
    try {

        const userId = req.userId;

        const cartItems = await CartProductModel.find({ 
            userId: userId 
        }).populate("productId", "name price");

        return res.json({
            message: "Cart items retrieved successfully",
            error: false,
            success: true,
            data: cartItems,
        });

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};