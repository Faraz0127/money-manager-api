import axios from 'axios';

//import { API_ENDPOINTS } from './API_endpoints'; 

const axiosConfig = axios.create({
    baseURL: BASE_URL, // Originally hardcoded as 'http://localhost:8080/api/version1.0' or the Render production URL [2, 3]
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// List of endpoints that do not require an authorization header [4]
const excludeEndpoints = [
    '/login', 
    '/register', 
    '/status', 
    '/activate', 
    '/health'
];

// Request Interceptor [4, 5]
axiosConfig.interceptors.request.use(
    (config) => {
        // Checks if the request URL matches any of the excluded public endpoints [4]
        const shouldSkipToken = excludeEndpoints.some((endpoint) => config.url.includes(endpoint));

        // If it shouldn't skip, attach the bearer token from local storage [5, 6]
        if (!shouldSkipToken) {
            const accessToken = localStorage.getItem('token');
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Response Interceptor [7, 8]
axiosConfig.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common global errors [8]
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = '/login';
            } else if (error.response.status === 500) {
                console.error('server error please try again later');
            }
        } else if (error.code === 'ECONNABORTED') {
            console.error('request timeout please try again');
        }
        return Promise.reject(error);
    }
);


export default axiosConfig;