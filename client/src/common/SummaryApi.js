export const baseURL = "http://localhost:8080";

const SummaryApi = {
    // User API endpoints
    register: {
        url: '/api/user/register',
        method: 'POST',
    },
    login: {
        url: '/api/user/login',
        method: 'POST',
    },
    forgot_password: {
        url: '/api/user/forgot-password',
        method: 'POST',
    },
    verify_otp: {
        url: '/api/user/verify-forgot-password-otp',
        method: 'POST',
    },
    reset_password: {
        url: '/api/user/reset-password',
        method: 'PUT',
    },
    refresh_token: {
        url: '/api/user/refresh-token',
        method: 'POST',
    },
    user_details: {
        url: '/api/user/user-details',
        method: 'GET',
    },
    logout: {
        url: '/api/user/logout',
        method: 'GET',
    },
    upload_avatar: {
        url: 'api/user/upload-avatar',
        method: 'PUT',
    },
    update_user: {
        url: 'api/user/update-user',
        method: 'PUT',
    },

    // Category API endpoints
    add_category: {
        url: 'api/category/add',
        method: 'POST',
    },
    upload_image: {
        url: 'api/file/upload',
        method: 'POST',
    },
    get_category: {
        url: 'api/category/get',
        method: 'GET',
    },
    update_category: {
        url: 'api/category/update',
        method: 'PUT',
    },
    delete_category: {
        url: 'api/category/delete',
        method: 'DELETE',
    },

    // Sub category API endpoint
    add_subCategory: {
        url: 'api/subcategory/add',
        method: 'POST',
    },
    get_subCategory: {
        url: 'api/subcategory/get',
        method: 'GET',
    },
    update_subCategory: {
        url: 'api/subcategory/update',
        method: 'PUT',
    },
    delete_subCategory: {
        url: 'api/subcategory/delete',
        method: 'DELETE',
    },
    
    // Product API endpoints
    add_product: {
        url: 'api/product/add',
        method: 'POST',
    },
    get_product: {
        url: 'api/product/get',
        method: 'POST',
    },
    get_product_by_category: {
        url: 'api/product/get-by-category',
        method: 'POST',
    },
    get_product_by_category_and_subCategory: {
        url: 'api/product/get-by-category-and-subcategory',
        method: 'POST',
    },
    get_product_by_id: {
        url: 'api/product/get-by-id',
        method: 'POST',
    },
    update_product: {
        url: 'api/product/update',
        method: 'PUT',
    },
    delete_product: {
        url: 'api/product/delete',
        method: 'DELETE',
    },
    
};

export default SummaryApi;