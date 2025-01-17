import CategoryModel from "../models/category.model.js";
import ProductModel from "../models/product.model.js";
import SubCategoryModel from "../models/subCategory.model.js";

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

        return res.status(201).json({
            message: "Product added successfully",
            error: false,
            success: true,
            data: saveProduct,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Get products controller
export const getProductsController = async(req, res) => {
    try {

        let {page, limit, search} = req.body;

        if(!page){
            page = 1;
        }

        if(!limit){
            limit = 10;
        }

        const query = search ? {
            $text: {
                $search: search,
            }
        } : {};

        const skip = (page - 1) * limit;

        await ProductModel.syncIndexes();

        const [data, totalCount] = await Promise.all([
            ProductModel.find(query).populate('category','name').populate('subCategory','name').sort({createdAt: -1}).skip(skip).limit(limit),
            ProductModel.countDocuments(query),
        ]);

        return res.json({
            message: "Products data",
            error: false,
            success: true,
            totalCount: totalCount,
            totalNoPage: Math.ceil(totalCount / limit),
            data: data,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Get product by category controller
export const getProductsByCategoryController = async(req, res) => {
    try {

        const { categoryId } = req.body;

        if(!categoryId) {
            return res.status(400).json({
                message: "Please provide categoryId",
                error: true,
                success: false,
            });
        }

        const products = await ProductModel.find({category: {$in: categoryId}}).populate('category', 'name').populate('subCategory', 'name').sort({createdAt: -1}).limit(15);

        if(!products) {
            return res.status(404).json({
                message: "No products found for this category",
                error: true,
                success: false,
            });
        }

        return res.json({
            message: "Products fetched successfully",
            error: false,
            success: true,
            data: products,
        });

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
};

// Get product by category and subcategory controller
export const getProductsByCategoryAndSubcategoryController = async(req, res) => {
    try {

        const { categoryId, subcategoryId } = req.body;
        let { page, limit } = req.body;

        if(!categoryId || !subcategoryId) {
            return res.status(400).json({
                message: "Please provide both categoryId and subcategoryId",
                error: true,
                success: false,
            });
        }

        if (page) {
            page = 1;
        }

        if (limit) {
            limit = 10;
        }

        const query = {
            category: { $in: categoryId},
            subCategory: { $in: subcategoryId }
        }

        const skip = (page - 1) * limit;

        const [data, dataCount, categoryName, subCategory] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query),
            CategoryModel.findById(categoryId),
            SubCategoryModel.findById(subcategoryId)
        ]);

        return res.json({
            message: "Products list fetched successfully",
            error: false,
            success: true,
            totalCount: dataCount,
            totalNoPage: Math.ceil(dataCount / limit),
            page: page,
            limit: limit,
            data: data,
            categoryName: categoryName.name,
            subCategoryName: subCategory.name,
        });

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Get product by id controller
export const getProductByIdController = async(req, res) => {
    try {

        const { productId } = req.body;

        if(!productId) {
            return res.status(400).json({
                message: "Please provide productId",
                error: true,
                success: false,
            });
        }
        
        const product = await ProductModel.findById(productId)
            .populate('subCategory', 'name')
            .populate('category', 'name');

        if(!product) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }
        
        return res.json({
            message: "Product fetched successfully",
            error: false,
            success: true,
            data: product,
        });

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Update product controller
export const updateProductController = async(req, res) => {
    try {

        const {_id} = req.body;

        if(!_id) {
            return res.status(400).json({
                message: "Please provide productId",
                error: true,
                success: false,
            });
        }

        const updatedProduct = await ProductModel.updateOne({_id: _id}, {...req.body});

        if(!updatedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        return res.json({
            message: "Product updated successfully",
            error: false,
            success: true,
            data: updatedProduct,
        });

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Delete product controller
export const deleteProductController = async(req, res) => {
    try {

        const { productId } = req.body;
        
        if(!productId) {
            return res.status(400).json({
                message: "Please provide productId",
                error: true,
                success: false,
            });
        }
        
        const deletedProduct = await ProductModel.deleteOne({_id: productId});
        
        if(!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }
        
        return res.json({
            message: "Product deleted successfully",
            error: false,
            success: true,
        });

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Search product
export const searchProductController = async(req, res) => {
    try {

        let { search, page, limit } = req.body;

        if(!page) {
            page = 1;
        }
        
        if(!limit) {
            limit = 10;
        }
/*
        const query = search ? {
            $or: [
                {
                    $text: {
                        $search: search,
                    }
                },
                {
                    name: {
                        $regex: `^${search}`, // Matches strings that start with the search term
                        $options: 'i' // Case-insensitive search
                    }
                }
            ]
        } : {};

        const skip = (page - 1) * limit;

        await ProductModel.syncIndexes();

        const [data, totalCount] = await Promise.all([
            ProductModel.find(query).populate('category', 'name').populate('subCategory', 'name').sort({ createdAt: -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query),
        ]);

        return res.json({
            message: "Products data",
            error: false,
            success: true,
            totalCount: totalCount,
            totalNoPage: Math.ceil(totalCount / limit),
            limit: limit,
            page: page,
            data: data,
        });
*/
        const textQuery = search ? {
            $text: { $search: search }
        } : {};

        const regexQuery = search ? {
            name: {
                $regex: `^${search}`,
                $options: 'i',
            }
        } : {};

        const skip = (page - 1) * limit;

        const [textData, regexData] = await Promise.all([
            ProductModel.find(textQuery)
                .populate('category', 'name')
                .populate('subCategory', 'name')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            ProductModel.find(regexQuery)
                .populate('category', 'name')
                .populate('subCategory', 'name')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
        ]);

        const uniqueData = [
            ...new Map([...textData, ...regexData].map(product => [product._id.toString(), product])).values()
        ];

        return res.json({
            message: "Products data",
            error: false,
            success: true,
            totalCount: uniqueData.length,
            totalNoPage: Math.ceil(uniqueData.length / limit),
            limit: limit,
            page: page,
            data: uniqueData,
        });


    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};