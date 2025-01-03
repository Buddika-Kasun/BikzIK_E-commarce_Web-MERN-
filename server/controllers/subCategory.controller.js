import ProductModel from '../models/product.model.js';
import SubCategoryModel from '../models/subCategory.model.js';

// Add new sub category controller
export const addSubCategoryController = async(req, res) => {
    try {

        const {name, image, category} = req.body;

        if(!name && !image && !category[0]) {
            return res.status(400).json({
                message: "Please provide all required fields",
                error: true,
                success: false,
            });
        }

        const newSubCategory = new SubCategoryModel({
            name,
            image,
            category
        });

        const saveSubCategory = await newSubCategory.save();

        if(!saveSubCategory) {
            return res.status(500).json({
                message: "Failed to add subcategory",
                error: true,
                success: false,
            });
        }

        return res.status(201).json({
            message: "Subcategory added successfully",
            error: false,
            success: true,
            data: saveSubCategory,
        });

    }
    catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Get all sub categories controller
export const getAllSubCategoriesController = async(req, res) => {
    try {

        const subCategories = await SubCategoryModel.find().sort({ createdAt: -1 }).populate('category');

        if(!subCategories) {
            return res.status(404).json({
                message: "No subcategories found",
                error: true,
                success: false,
            });
        }

        return res.status(200).json({
            message: "Subcategories fetched successfully",
            error: false,
            success: true,
            data: subCategories,
        });

    }
    catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Update sub category controller
export const updateSubCategoryController = async(req, res) => {
    try{

        const { subCategoryId, name, image, category } = req.body;

        if(!subCategoryId && !name && !image && !category[0]) {
            return res.status(400).json({
                message: "Please provide all required fields",
                error: true,
                success: false,
            });
        }

        const updateSubCategory = await SubCategoryModel.updateOne({
            _id: subCategoryId
        }, {
            name,
            image,
            category,
        });

        return res.status(200).json({
            message: "Subcategory updated successfully",
            error: false,
            success: true,
        });

    }
    catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Delete sub category controller
export const deleteSubCategoryController = async(req, res) => {
    try{

        const { subCategoryId } = req.body;

        const dependProduct = await ProductModel.find({
            subCategory: {
                $in: [subCategoryId]
            }
        }).countDocuments();

        if (dependProduct > 0) {
            return res.status(400).json({
                message: "Sub category is already used can't be delete",
                error: true,
                success: false,
            });
        }

        const deleteSubCategory = await SubCategoryModel.deleteOne({
            _id: subCategoryId
        });

        if(!deleteSubCategory) {
            return res.status(404).json({
                message: "Sub category not found",
                error: true,
                success: false,
            });
        }

        return res.status(200).json({
            message: "Subcategory deleted successfully",
            error: false,
            success: true,
            data: deleteSubCategory,
        });

    }
    catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};