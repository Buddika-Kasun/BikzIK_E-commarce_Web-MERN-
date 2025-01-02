import SubCategoryModel from '../models/subCategory.model';

// Add new subcategory controller
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