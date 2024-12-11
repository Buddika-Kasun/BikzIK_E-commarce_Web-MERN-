import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

export const generateAccessToken = async(userId) => {

    const accessToken = await jwt.sign(
        { id: userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5h' }
    );

    return accessToken;

};

export const generateRefreshToken = async(userId) => {

    const refreshToken = await jwt.sign(
        { id: userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    const updateRefreshToken = await UserModel.updateOne(
        {_id: userId},
        process.env.REFRESH_TOKEN_SECRET,
        { refresh_token: refreshToken}
    );

    return refreshToken;

};
