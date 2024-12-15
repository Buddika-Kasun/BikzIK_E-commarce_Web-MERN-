import axios from 'axios';
import SummaryApi, { baseURL } from '../common/SummaryApi';

// Create a new instance of axios
const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

// Sending access token in the header
Axios.interceptors.request.use(
    async(config) => {
        const accessToken = localStorage.getItem('accessToken');

        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Extend the life span of access token with the help refresh
Axios.interceptors.request.use(
    (response) => {
        return response;
    },
    async(error) => {
        let originalRequest = error.config;

        if(error.response.status === 401  && !originalRequest._isRetry) {
            originalRequest._isRetry = true;

            const refreshToken = localStorage.getItem('refreshToken');

            if(refreshToken) {
                const newAccessToken = refreshAccessToken(refreshToken);

                if(newAccessToken) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return Axios(originalRequest);
                }
            }
        }

        return Promise.reject(error);

    }
);

const refreshAccessToken = async(refreshToken) => {
    try{
        const response = await Axios({
            ...SummaryApi.refresh_token,
            headers: {
                'Authorization': `Bearer ${refreshToken}`,
            }
        });
        console.log(response);

        const accessToken = response.data.data.accessToken;

        localStorage.setItem('accessToken', accessToken);

        return accessToken;

    }
    catch(error) {
        console.error('Error refreshing access token:', error);
    }
}

export default Axios;