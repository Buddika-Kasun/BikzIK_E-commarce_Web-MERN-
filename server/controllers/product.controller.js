import ProductModel from "../models/product.model.js";

// Add new product controller
export const addProductController = async(req, res) => {
    try {
        const {
            name,
            price,
            discount,
            stock,
            description,
            unit,
            images,
            category,
            subCategory,
            more_details,
        } = req.body;

        if (!name || !price || !images ) {
            return res.status(400).json({
                message: "Please provide all required fields",
                error: true,
                success: false,
            });
        }

        const newProduct = new ProductModel({
            name,
            price,
            discount,
            stock,
            description,
            unit,
            image: images,
            category,
            subCategory,
            more_details,
        });

        const saveProduct = await newProduct.save();

        res.status(201).json({
            message: "Product added successfully",
            error: false,
            success: true,
            data: saveProduct,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: true,
            success: false,
        });
    }
};