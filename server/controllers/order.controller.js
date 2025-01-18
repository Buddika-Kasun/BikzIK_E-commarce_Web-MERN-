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
            status: { $nin: ["Cancelled", "Received"] }
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

// Update order status to "Canceled" for admin controller
export const adminCancelOrderController = async (req, res) => {
    try {
        const { orderId } = req.body;

        // Fetch the order to check its current status
        const order = await OrderModel.findOne({ orderId: orderId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the current status is one of the restricted statuses
        if (["Delivered", "Cancelled", "Received"].includes(order.status)) {
            return res.status(400).json({
                message: `Order cannot be cancel as it is already ${order.status}.`,
                success: false,
                error: true,
            });
        }

        // Update the order status to 'Canceled'
        const updatedOrder = await OrderModel.updateOne(
            { orderId: orderId },
            { status: 'Cancelled' }
        );

        if (updatedOrder.modifiedCount === 0) {
            return res.status(400).json({
                message: 'Order status update failed',
                success: false,
                error: true,
            });
        }

        return res.json({
            message: 'Order cancelled successfully',
            success: true,
            error: false,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Update order status to "Canceled" for user controller
export const userCancelOrderController = async (req, res) => {
    try {
        const userId = req.userId;
        const { orderId } = req.body;

        // Find the order to check its current status
        const order = await OrderModel.findOne({ orderId: orderId, userId: userId });

        // If the order does not exist, return an error
        if (!order) {
            return res.status(404).json({ 
                message: 'Order not found', 
                error: true, 
                success: false 
            });
        }

        // Check if the order status is not "Pending"
        if (order.status !== "Pending") {
            return res.status(400).json({ 
                message: 'Only pending orders can be canceled', 
                error: true, 
                success: false 
            });
        }

        // Update the order status to "Canceled"
        const updatedOrder = await OrderModel.updateOne(
            { orderId: orderId, userId: userId }, 
            { status: "Cancelled" }
        );

        // If the order is not updated (unexpected case), handle it
        if (updatedOrder.nModified === 0) {
            return res.status(500).json({
                message: 'Failed to cancel the order',
                error: true,
                success: false,
            });
        }

        // Successfully canceled the order
        return res.json({
            message: 'Order cancelled successfully',
            success: true,
            error: false,
        });

    } catch (err) {
        // Handle server errors
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

