import mongoose from "mongoose";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import CartProductModel from "../models/cartProduct.model.js";

// Add order controller
export const addOrderController = async(req, res) => {
    try {

        const userId = req.userId;
        const { productList, shippingAddress, paymentMethod, totalPrice } = req.body;

        /* 
        const payload = productList.map(el => {
            return {
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: el.productId._id,
                product_details: {
                    name: el.productId.name,
                    image: el.productId.image,
                    price: el.productId.price,
                    discount: el.productId.discount,
                    unit: el.productId.unit,
                    quantity: el.quantity
                },
                paymentId: '',
                payment_status: 'COD',
                delivery_address: shippingAddress,
                subTotalAmount: totalPrice,
                totalAmount: totalPrice,
            };
        }); 

        const saveOrder = await OrderModel.insertMany(payload);
        */
        // 1 or 2
        const payload = {
            userId: userId,
            orderId: `ORD-${new mongoose.Types.ObjectId()}`,
            product_details: 
                productList.map(el => {
                    return {
                        productId: el.productId._id,
                        name: el.productId.name,
                        image: el.productId.image,
                        price: el.productId.price,
                        discount: el.productId.discount,
                        unit: el.productId.unit,
                        quantity: el.quantity
                    }
                }),
            paymentId: '',
            payment_status: 'COD',
            delivery_address: shippingAddress,
            subTotalAmount: totalPrice,
            totalAmount: totalPrice,
        };

        //const saveOrder = await OrderModel.create(payload);
        // 1 or 2
        const newOrder = new OrderModel(payload);
        const saveOrder = await newOrder.save();

        // Remove from the cart
        const removeCartItems = await CartProductModel.deleteMany({userId: userId});
        const userUpdate = await UserModel.updateOne({_id: userId}, {shopping_cart: []});

        return res.json({
            message: "Order successfully",
            success: true,
            error: false,
            data: saveOrder,
        });

    }
    catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};