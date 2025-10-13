// src/lib/api.ts
import axios, { AxiosInstance } from 'axios';

const isServer = typeof window === 'undefined';

export function createApi(cookieHeader?: string): AxiosInstance {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    // On server: include all cookies as string
    if (isServer && cookieHeader) {
        headers['Cookie'] = cookieHeader;
    }

    const instance = axios.create({
        baseURL: isServer
            ? process.env.BACKEND_URL || 'http://127.0.0.1:8000/api/py/'
            : '/api/py/',
        withCredentials: true,
        headers,
    });

    // Response interceptor
    instance.interceptors.response.use(
        (response) => {
            // If streaming, return full response to access response.data (the stream)
            if (response.config.responseType === 'stream') {
                return response;
            }
            return response.data || response;
        },
        async (error) => {
            console.log(error);
            const originalRequest = error.config;
            const isAuthEndpoint = originalRequest.url?.includes('/auth/');
            const is401 = error.response?.status === 401;

            if (is401 && !isAuthEndpoint && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    await instance.post('/auth/refresh');
                    return instance(originalRequest);
                } catch (refreshError) {
                    if (!isServer) {
                        // window.location.href = '/log-in';
                    }
                    return Promise.reject(refreshError);
                }
            }


            type ErrorMap = Record<string, string>;
            interface FieldError {
                field: string;
                message: string;
            }
            if (error?.response) {
                const errData = error.response.data?.error || {};
                console.log(errData);
                const fieldErrors = (errData.errors || []) as FieldError[];
                const formattedErrors: ErrorMap = fieldErrors.reduce<ErrorMap>((acc, err) => {
                    acc[err.field] = err.message;
                    return acc;
                }, {} as ErrorMap);

                let generalMessage = formattedErrors.body || errData.message ;
                if (fieldErrors.length > 0) {
                    generalMessage = '';
                }

                return Promise.reject({ general: generalMessage, ...formattedErrors });
            } else if (error.request) {
                return Promise.reject({ general: "An unexpected error occored" });
            } else {
                return Promise.reject({ general: error.message });
            }
        }
    );

    return instance;
}

export const api = createApi();

export default api;