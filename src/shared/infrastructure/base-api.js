import axios from 'axios';
const platformApi = `${import.meta.env.VITE_HERA_API_URL}/api/v1`;

export class BaseApi {
    #http;

    constructor() {
        this.#http = axios.create({
            baseURL: platformApi,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    get http() { return this.#http; }
}
