import CategoryModel from '../models/category.model.js';
import ProductModel from '../models/product.model.js';
import SubCategoryModel from '../models/subCategory.model.js';

// Add new category controller
export const addCategoryController = async(req, res) => {
    try{

        const { name, image } = req.body;

        if(!name || !image) {
            return res.status(400).json({
                message: "Please provide all required fields",
                error: true,
                success: false,
            });
        }

        const newCategory = new CategoryModel({
            name,
            image,
        });

        const saveCategory = await newCategory.save();

        if(!saveCategory) {
            return res.status(500).json({
                message: "Failed to add category",
                error: true,
                success: false,
            });
        }

        return res.status(201).json({
            message: "Category added successfully",
            error: false,
            success: true,
            data: saveCategory,
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

// Get all categories controller
export const getAllCategoriesController = async(req, res) => {
    try{

        const categories = await CategoryModel.find().sort({ createdAt: -1 });

        if(!categories) {
            return res.status(404).json({
                message: "No categories found",
                error: true,
                success: false,
            });
        }

        return res.status(200).json({
            message: "Categories fetched successfully",
            error: false,
            success: true,
            data: categories,
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

// Update category controller
export const updateCategoryController = async(req, res) => {
    try{

        const {categoryId, name, image} = req.body;

        const update = await CategoryModel.updateOne({
            _id: categoryId
        },{
            name,
            image,
        });

        return res.json({
            message: "Category updated successfully",
            error: false,
            success: true,
            data: update,
        });

    }
    catch(err){
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

// Delete category controller
export const deleteCategoryController = async(req, res) => {
    try{

        const {categoryId} = req.body;

        const dependSubCategory = await SubCategoryModel.find({
            category: {
                "$in": [categoryId]
            }
        }).countDocuments();
        
        const dependProduct = await ProductModel.find({
            category: {
                "$in": [categoryId]
            }
        }).countDocuments();
        
        if (dependSubCategory> 0 || dependProduct > 0) {
            return res.status(400).json({
                message: "Category is already used can't be delete",
                error: true,
                success: false,
            });
        }
        
        const deleteCategory = await CategoryModel.deleteOne({
            _id: categoryId
        });
        
        return res.json({
            message: "Category deleted successfully",
            error: false,
            success: true,
            data: deleteCategory,
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