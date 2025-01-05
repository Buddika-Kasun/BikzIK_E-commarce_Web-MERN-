import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    image: {
        type: Array,
        default: []
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
    }],
    unit: {
        type: String,
        default: null
    },
    stock: {
        type: Number,
        default: null
    },
    price: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        default: ""
    },
    more_details: {
        type: Object,
        default: {}
    },
    publish: {
        type: Boolean,
        default: true
    },
},{
    timestamps: true,
});

// Create text index
productSchema.index({
    name: "text",
    description: "text"
}, {
    name: 10,
    description: 5
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;