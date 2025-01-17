import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    orderId: {
        type: String,
        required: [true, "Provide orderId"],
        unique: true
    },
    /* productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    }, */
    // 1 or
    product_details: [{
        // 2
        productId: mongoose.Schema.ObjectId,
        name: String,
        image: Array,
        price: Number,
        discount: Number,
        unit: String,
        quantity: Number
    }],
    paymentId: {
        type: String,
        default: ""
    },
    payment_status: {
        type: String,
        default: ""
    },
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: "Address"
    },
    subTotalAmount: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    invoice_receipt: {
        type: String,
        default: ""
    }
},{
    timestamps: true
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;