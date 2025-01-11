import UserModel from "../models/user.model.js";

export const admin = async(req, res, next) => {
    try {
        const userId = req.userId;

        const user = await UserModel.findById(userId);

        if (user.role !== 'ADMIN') {
            return res.status(403).json({
                message: "Permission denied",
                error: true,
                success: false,
            });
        }

        next();
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}