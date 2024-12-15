export const baseURL = "http://localhost:8080";

const SummaryApi = {
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
    }
};

export default SummaryApi;