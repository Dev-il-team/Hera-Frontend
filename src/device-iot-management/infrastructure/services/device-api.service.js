import axios from 'axios';

const http = axios.create({
    baseURL: `${import.meta.env.VITE_HERA_API_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export class DeviceApiService {
    async getAll() {
        const response = await http.get('/devices');
        return response.data;
    }

    async create(device) {
        const response = await http.post('/devices', device);
        return response.data;
    }

    async update(id, device) {
        const response = await http.put(`/devices/${id}`, device);
        return response.data;
    }

    async delete(id) {
        await http.delete(`/devices/${id}`);
    }
}