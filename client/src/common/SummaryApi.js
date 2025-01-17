export const baseURL = import.meta.env.VITE_API_URL;

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
    search_product: {
        url: 'api/product/search',
        method: 'POST',
    },

    // Cart API endpoints
    add_to_cart: {
        url: 'api/cart/add',
        method: 'POST',
    },
    get_cart_items: {
        url: 'api/cart/get',
        method: 'GET',
    },
    update_cart_item_qty: {
        url: 'api/cart/update-qty',
        method: 'PUT',
    },
    delete_cart_item: {
        url: 'api/cart/delete',
        method: 'DELETE',
    },

    // Address API endpoints
    add_address: {
        url: 'api/address/add',
        method: 'POST',
    },
    get_addresses: {
        url: 'api/address/get',
        method: 'GET',
    },
    update_address: {
        url: 'api/address/update',
        method: 'PUT',
    },
    delete_address: {
        url: 'api/address/delete',
        method: 'DELETE',
    },
    get_address_by_id: {
        url: 'api/address/get-by-id',
        method: 'POST',
    },

    // Order API endpoints
    add_order: {
        url: 'api/order/add',
        method: 'POST',
    },
    get_orders: {
        url: 'api/order/get',
        method: 'GET',
    },
    get_all_orders: {
        url: 'api/order/get-all',
        method: 'GET',
    },
    update_order_status: {
        url: 'api/order/update-status',
        method: 'PUT',
    },
    admin_cancel_order: {
        url: 'api/order/admin-cancel',
        method: 'PUT',
    },
    user_cancel_order: {
        url: 'api/order/user-cancel',
        method: 'PUT',
    },
    
};

export default SummaryApi;