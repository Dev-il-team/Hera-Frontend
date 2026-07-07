import axios from 'axios';

const configuredUrl = import.meta.env.VITE_HERA_API_URL ?? '';
// Avoid duplicating the /api/v1 prefix when it is already part of the env URL.
const platformApi = configuredUrl.endsWith('/api/v1')
    ? configuredUrl
    : `${configuredUrl}/api/v1`;

const TOKEN_STORAGE_KEY = 'hera.auth.token';

export class BaseApi {
    #http;

    constructor() {
        this.#http = axios.create({
            baseURL: platformApi,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Attach the JWT sent by the backend as a Bearer token on every request.
        this.#http.interceptors.request.use(config => {
            const token = localStorage.getItem(TOKEN_STORAGE_KEY);
            if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        });

        // On 401 (expired/invalid token) clear the session and go to sign-in.
        this.#http.interceptors.response.use(
            response => response,
            error => {
                const status = error?.response?.status;
                const isAuthCall = error?.config?.url?.includes('/authentication/');
                if (status === 401 && !isAuthCall) {
                    localStorage.removeItem(TOKEN_STORAGE_KEY);
                    localStorage.removeItem('hera.auth.username');
                    localStorage.removeItem('hera.auth.userId');
                    if (!window.location.pathname.startsWith('/sign-in'))
                        window.location.assign('/sign-in');
                }
                return Promise.reject(error);
            }
        );
    }

    get http() { return this.#http; }
}
