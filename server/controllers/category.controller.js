import CategoryModel from '../models/category.model.js';

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