import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordRequestPage from '../pages/ForgotPasswordRequestPage';
import OtpVerifyPage from '../pages/OtpVerifyPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordRequestPage />
            },
            {
                path: 'verify-otp',
                element: <OtpVerifyPage />
            },
            {
                path: 'reset-password',
                element: <ResetPasswordPage />
            }
        ]
    }
]);

export default router;