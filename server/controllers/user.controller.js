import sendEmail from '../configs/sendEmail.js';
import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import { generateRefreshToken, generateAccessToken } from '../utils/generateTokens.js';
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js';
import generateOTP from '../utils/generateOTP.js';
import forgotPasswordOtpTemplate from '../utils/forgotPasswordOtpTemplate.js';

// Register new user
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

// Verify user email
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

// Login user
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

// Logout the user
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

// Upload avatar
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

// Update name, mobile, email and password
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

// Forgot Password without login
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
            subject: 'Forgot Password from Binkeyit',
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