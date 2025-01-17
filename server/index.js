import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './configs/connectDB.js';
import userRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import uploadImageRouter from './routes/uploadImage.route.js';
import subCategoryRouter from './routes/subCategory.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import addressRouter from './routes/address.route.js';
import orderRouter from './routes/order.route.js';

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
app.use('/api/category', categoryRouter);
app.use('/api/file', uploadImageRouter);
app.use('/api/subcategory', subCategoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Connect to MongoDB
connectDB().then(() => {
    // Server listening...
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}); 