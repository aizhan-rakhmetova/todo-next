import axios, { AxiosError } from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10_000,
});

apiClient.interceptors.request.use(
    (config) => {
        const url = config.url ?? '';

        if (/^\/api(\/|$)/.test(url)) {
            config.baseURL = undefined;
        }

        if (process.env.NODE_ENV !== 'production') {
            console.log(`HTTP ${String(config.method).toUpperCase()} → ${url}`);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => {
        if (process.env.NODE_ENV !== 'production') {
            console.log(`HTTP ${response.status} ← ${response.config.url}`);
        }
        return response;
    },
    (error: AxiosError) => {
        const status = error.response?.status;
        const url = error.config?.url;
        const data = error.response?.data;
        console.error(`HTTP ERROR ${status ?? ''} ← ${url}`, data ?? error.message);
        return Promise.reject(error);
    }
);
