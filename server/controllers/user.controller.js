import sendEmail from '../configs/sendEmail.js';
import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';

const registerUserController = async(req, res) => {
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
}

export default registerUserController;