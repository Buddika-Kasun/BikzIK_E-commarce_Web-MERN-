import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordRequestPage from '../pages/ForgotPasswordRequestPage';
import OtpVerifyPage from '../pages/OtpVerifyPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import Dashboard from '../layouts/Dashboard';
import ProfilePage from '../pages/ProfilePage';
import MyOrdersPage from '../pages/MyOrdersPage';
import AddressPage from '../pages/AddressPage';
import CategoryPage from '../pages/CategoryPage';
import SubcategoryPage from '../pages/SubcategoryPage';
import AdminProductsPage from '../pages/AdminProductsPage';
import UploadProductPage from '../pages/UploadProductPage';
import AdminPermission from '../layouts/AdminPermission';
import ProductListPage from '../pages/ProductListPage';
import ProductDisplayPage from '../pages/ProductDisplayPage';
import CheckoutPage from '../pages/CheckoutPage';
import ResponsePage from '../pages/ResponsePage';
import AdminOrdersPage from '../pages/AdminOrdersPage';

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
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
                children: [
                    {
                        path: 'admin',
                        children: [
                            {
                                path: 'category',
                                element: <AdminPermission><CategoryPage /></AdminPermission>
                            },
                            {
                                path: 'sub-category',
                                element: <AdminPermission><SubcategoryPage /></AdminPermission>                   
                            },
                            {
                                path: 'upload-product',
                                element: <AdminPermission><UploadProductPage /></AdminPermission>
                            },
                            {
                                path: 'products',
                                element: <AdminPermission><AdminProductsPage /></AdminPermission>
                            },
                            {
                                path: 'orders',
                                element: <AdminPermission><AdminOrdersPage /></AdminPermission>
                            }
                        ]
                    },
                    {
                        path: 'profile',
                        element: <ProfilePage />
                    },
                    {
                        path: 'my-orders',
                        element: <MyOrdersPage />
                    },
                    {
                        path: 'address',
                        element: <AddressPage />
                    },
                    /* {
                        path: 'category',
                        element: <AdminPermission><CategoryPage /></AdminPermission>
                    },
                    {
                        path: 'sub-category',
                        element: <AdminPermission><SubcategoryPage /></AdminPermission>                   
                    },
                    {
                        path: 'upload-product',
                        element: <AdminPermission><UploadProductPage /></AdminPermission>
                    },
                    {
                        path: 'admin-products',
                        element: <AdminPermission><AdminProductsPage /></AdminPermission>
                    },
                    {
                        path: 'admin-orders',
                        element: <AdminPermission><AdminOrdersPage /></AdminPermission>
                    } */
                ]
            },
            {
                path: ':category',
                children: [
                    {
                        path: ':subCategory',
                        element: <ProductListPage />
                    }
                ]
            },
            {
                path: 'product/:product',
                element: <ProductDisplayPage />
            },
            {
                path: 'checkout',
                element: <CheckoutPage />
            },
            {
                path: 'response',
                element: <ResponsePage />
            },
        ]
    }
]);

export default router;