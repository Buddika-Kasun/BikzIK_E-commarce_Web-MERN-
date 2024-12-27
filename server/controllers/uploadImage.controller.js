import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

const uploadImageController = async(req, res) => {
    try {
        const image = req.file;

        const uploadImage = await uploadImageCloudinary(image);
        
        return res.status(200).json({
            message: "Image uploaded successfully",
            data: uploadImage,
            error: false,
            success: true,
        });
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

export default uploadImageController;