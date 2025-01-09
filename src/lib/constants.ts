export const API_ENDPOINTS = {
    USERS: '/api/users',
    ORDERS: '/api/orders',
    AUTH: '/api/auth',
};

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest',
}

export enum OrderStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export const APP_SETTINGS = {
    TIMEOUT: 5000, // Таймаут для запросов
    LOCAL_STORAGE_KEY: 'app-data',
};
