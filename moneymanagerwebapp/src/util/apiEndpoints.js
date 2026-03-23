// Swap between production and local environments by commenting/uncommenting the BASE_URL
export const BASE_URL = 'https://money-manager-api-6bph.onrender.com/api/v1.0'; // Production Render URL
// export const BASE_URL = 'http://localhost:8080/api/version1.0'; // Local development URL

// Cloudinary configuration for uploading profile images
const CLOUDINARY_CLOUD_NAME = 'dp7wj7pur'; // Replace with your actual Cloudinary Cloud Name

export const API_ENDPOINTS = {
    //baseURL: BASE_URL,
    
    // Auth & User Profile [1, 4, 5]
    LOGIN: '/login',
    REGISTER: '/register',
    getUserInfo: '/profile', 
    GET_ALL_CATEGORIES: '/categories',
    ADD_CATEGORY: '/categories',
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`, 
    GET_ALL_INCOMES: '/incomes',
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
    ADD_INCOME: '/incomes',
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD: "excel/download/income",
    EMAIL_INCOME: "/email/income-excel",
    APPLY_FILTERS: "/filter",
    DASHBOARD_DATA: "/dashboard",

    GET_ALL_EXPENSES: '/expenses',
    ADD_EXPENSE: '/expenses',
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    CATEGORY_BY_TYPE_EXPENSE: (type) => `/categories/${type}`,
    EXPENSE_EXCEL_DOWNLOAD: '/excel/download/expense',
    EMAIL_EXPENSE: '/email/expense-excel',
     
    // Public profile route
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}