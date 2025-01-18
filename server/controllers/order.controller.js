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

// Get order controller
export const getOrdersController = async(req, res) => {
    try {

        const userId = req.userId;

        const userOrders = await OrderModel.find({userId: userId}).sort({createdAt: -1});

        return res.json({
            message: "User orders retrieved successfully",
            success: true,
            error: false,
            data: userOrders,
        });

    }
    catch(err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
};

// Get all orders controller
export const getAllOrdersController = async(req, res) => {
    try {

        const allOrders = await OrderModel.find({
            status: { $nin: ["Canceled", "Received"] }
        }).sort({ createdAt: 1 });

        return res.json({
            message: "All orders retrieved successfully",
            success: true,
            error: false,
            data: allOrders,
        });

    }
    catch(err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Update order status controller
export const updateOrderStatusController = async(req, res) => {
    try {

        const {orderId, status} = req.body;

        let newStatus;

        switch (status) {
        case 'Pending':
            newStatus = 'Processing';
            break;
        case 'Processing':
            newStatus = 'Shipped';
            break;
        case 'Shipped':
            newStatus = 'Delivered';
            break;
        default:
            return res.status(400).json({ message: 'Invalid status' });
        }

        const updatedOrder = await OrderModel.updateOne({orderId: orderId}, {status: newStatus});

        if(!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        return res.json({
            message: 'Order status updated successfully',
            success: true,
            error: false,
        });

    }
    catch(err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};