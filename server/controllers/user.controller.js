import sendEmail from '../configs/sendEmail.js';
import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import { generateRefreshToken, generateAccessToken } from '../utils/generateTokens.js';
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js';
import generateOTP from '../utils/generateOTP.js';
import forgotPasswordOtpTemplate from '../utils/forgotPasswordOtpTemplate.js';
import jwt from 'jsonwebtoken';

// Register new user controller
export const registerUserController = async(req, res) => {
    try{

        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                message: 'Please fill all required fields.',
                error: true,
                success: false,
            });
        }

        const user = await UserModel.findOne({ email });

        if(user) {
            return res.status(400).json({
                message: 'Email already exists.',
                error: true,
                success: false,
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const payload = {
            name,
            email,
            password: hashPassword,
        };

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const verifyEmailURL = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: 'Email Verification',
            html: verifyEmailTemplate({
                    name,
                    url: verifyEmailURL,
                }),
        });

        return res.json({
            message: 'User registered successfully.',
            error: false,
            success: true,
            data: save,
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Verify user email controller
export const verifyEmailController = async(req, res) => {
    try{

        const { code } = req.body;

        const user = await UserModel.findOne({_id: code});

        if(!user) {
            return res.status(404).json({
                message: 'User not found.',
                error: true,
                success: false,
            });
        }

        const updateUser = await UserModel.updateOne({_id: code}, {
            verify_email: true,
        });

        return res.json({
            message: 'Email verified successfully.',
            error: false,
            success: true,
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Login user controller
export const loginUserController = async(req, res) => {
    try{

        const { email, password } = req.body;

        if(!email ||!password) {
            return res.status(400).json({
                message: 'Please fill all required fields.',
                error: true,
                success: false,
            });
        }

        const user = await UserModel.findOne({email: email});

        if(!user) {
            return res.status(404).json({
                message: 'User not found.',
                error: true,
                success: false,
            });
        }

        if(user.status !== 'Active'){
            return res.status(401).json({
                message: 'User is not active. So contact the admin',
                error: true,
                success: false,
            });
        }

        const isMatchPassword = await bcryptjs.compare(password, user.password);

        if(!isMatchPassword) {
            return res.status(401).json({
                message: 'Invalid credentials.',
                error: true,
                success: false,
            });
        }

        const updateUser = await UserModel.findByIdAndUpdate(user?.id, {
            last_login_date: new Date(),
        });

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        res.cookie('accessToken', accessToken, cookieOption);
        res.cookie('refreshToken', refreshToken, cookieOption);

        return res.json({
            message: 'Logged in successfully.',
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken,
            },
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Logout the user controller
export const logoutUserController = async(req, res) => {
    try{

        const userId = req.userId;

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        res.clearCookie('accessToken', cookieOption);
        res.clearCookie('refreshToken', cookieOption);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(
            userId,
            { refresh_token: "" }
        );

        return res.json({
            message: 'Logged out successfully.',
            error: false,
            success: true,
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Upload avatar controller
export const uploadAvatarController = async(req, res) => {
    try{

        const userId = req.userId; // auth middleware
        const image = req.file; // multer middleware

        if(!image) {
            return res.status(400).json({
                message: 'No image provided.',
                error: true,
                success: false,
            });
        }

        const upload = await uploadImageCloudinary(image);

        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            { avatar: upload.url}
        );

        return res.json({
            message: 'Avatar uploaded successfully.',
            error: false,
            success: true,
            data: {
                _id: userId,
                avatar: upload.url,
            },
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Update name, mobile, email and password controller
export const updateProfileController = async(req, res) => {
    try{

        const userId = req.userId; // auth middleware
        const { name, email, password, mobile } = req.body;

        const hashPassword = "";

        if(password){
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt);
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                ...(name && {name: name}),
                ...(email && {email: email}),
                ...(mobile && {mobile: mobile}),
                ...(password && {password: hashPassword}),
            },
            { new: true }
        );

        return res.json({
            message: "Update successful",
            error: false,
            success: true,
            data: updateUser,
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Forgot Password without login controller
export const forgotPasswordController = async(req, res) => {
    try{

        const { email } = req.body;

        const user = await UserModel.findOne({email: email});

        if(!user) {
            return res.status(404).json({
                message: 'User not found.',
                error: true,
                success: false,
            });
        }

        const otp = generateOTP();
        const expireTime = new Date(Date.now() + 60 * 60 * 1000); // 1hour

        const updateUser = await UserModel.findByIdAndUpdate(
            user._id,
            {
                forgot_password_otp: otp,
                forgot_password_expiry: expireTime,
            },
            { new: true }
        );

        await sendEmail({
            sendTo: user.email,
            subject: 'Forgot Password from BikzIK',
            html: forgotPasswordOtpTemplate({
                    name: user.name,
                    otp: otp,
                    expireTime: expireTime,
                }),
        });

        return res.json({
            message: 'OTP sent successfully. Check your email.',
            error: false,
            success: true,
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Verify forgot password OTP controller
export const verifyForgotPasswordOtpController = async(req, res) => {
    try{

        const { email, otp } = req.body;

        if(!email || !otp) {
            return res.status(400).json({
                message: 'Provide required fields.(email, otp)',
                error: true,
                success: false,
            });
        }

        const user = await UserModel.findOne({email: email});

        if(!user) {
            return res.status(404).json({
                message: 'User not found.',
                error: true,
                success: false,
            });
        }

        const currentTime = Date.now();

        if(currentTime > user.forgot_password_expiry) {
            return res.status(401).json({
                message: 'OTP is expired. Try again.',
                error: true,
                success: false,
            });
        }

        if(user.forgot_password_otp !== otp) {
            return res.status(401).json({
                message: 'Invalid OTP.',
                error: true,
                success: false,
            });
        }

        // if otp is not expired and otp is valid
        return res.json({
            message: 'OTP verified successfully.',
            error: false,
            success: true,
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Reset forgot password controller
export const resetForgotPasswordController = async(req, res) => {
    try{

        const { email, newPassword, confirmPassword } = req.body;

        if(!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: 'Provide required fields.(email, newPassword, confirmPassword)',
                error: true,
                success: false,
            });
        }

        const user = await UserModel.findOne({email});

        if(!user) {
            return res.status(404).json({
                message: 'User not found.',
                error: true,
                success: false,
            });
        }

        if(newPassword !== confirmPassword) {
            return res.status(400).json({
                message: 'Password and confirm password do not match.',
                error: true,
                success: false,
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword, salt);

        const updateUser = await UserModel.findByIdAndUpdate(
            user._id,
            {
                password: hashPassword,
                forgot_password_otp: "",
                forgot_password_expiry: "",
            },
            { new: true }
        );

        return res.json({
            message: 'Password reset successfully.',
            error: false,
            success: true,
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Refresh token controller
export const refreshTokenController = async(req, res) => {
    try{

        const refreshToken = req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1];

        if(!refreshToken) {
            return res.status(401).json({
                message: 'Refresh token is missing.',
                error: true,
                success: false,
            });
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if(!verifyToken){
            return res.status(401).json({
                message: 'Refresh token is expired.',
                error: true,
                success: false,
            });
        }

        const userId = verifyToken?._id

        const newAccessToken = await generateAccessToken(userId);

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        res.cookie('accessToken', newAccessToken, cookieOption);

        return res.json({
            message: 'Access token refreshed successfully.',
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken,
            },
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Get login user details
export const getUserDetailsController = async(req, res) => {
    try{

        const userId = req.userId; // auth middleware

        const user = await UserModel.findById(userId).select('-password -refresh_token');

        return res.json({
            message: "User details fetched successfully",
            error: false,
            success: true,
            data: user,
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};