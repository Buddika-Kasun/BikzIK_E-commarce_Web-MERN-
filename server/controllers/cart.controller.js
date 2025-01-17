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
        }).populate("productId", "name price discount image unit");

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

// Update cart item qty controller
export const updateCartItemQtyController = async(req, res) => {
    try {

        const userId = req.userId;
        
        const { _id, qty } = req.body;

        if(!_id || qty < 0) {
            return res.status(400).json({
                message: "Please provide _id and qty",
                error: true,
                success: false,
            });
        }

        const updateCartItem = await CartProductModel.updateOne(
            { 
                _id: _id ,
                userId: userId
            },
            { 
                quantity: qty 
            },
        );

        return res.json({
            message: "Cart item quantity updated successfully",
            error: false,
            success: true,
            data: updateCartItem,
        })

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Delete cart item controller
export const deleteCartItemController = async(req, res) => {
    try {
        const userId = req.userId;
        
        const { _id } = req.body;

        if(!_id) {
            return res.status(400).json({
                message: "Please provide _id",
                error: true,
                success: false,
            });
        }

        const deleteCartItem = await CartProductModel.deleteOne({
            _id: _id,
            userId: userId,
        });

        return res.json({
            message: "Cart item deleted successfully",
            error: false,
            success: true,
            data: deleteCartItem,
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
