import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));

app.use(express.json());

app.use(cookieParser());

app.use(morgan());

app.use(helmet({
    // If Backend and Frontend use the different domain then error not occurred
    crossOriginEmbedderPolicy: false, 
}));