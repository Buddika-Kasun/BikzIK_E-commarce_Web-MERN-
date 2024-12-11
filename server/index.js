import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './configs/connectDB.js';
import userRouter from './routes/user.route.js';

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

const PORT = 8080 || process.env.PORT;

app.get("/", (req, res) => {
    // Server to client
    res.json({
        message: `Server is running on port ${PORT}`,
    });
});

app.use('/api/user', userRouter);

// Connect to MongoDB
connectDB().then(() => {
    // Server listening...
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}); 