import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3000',
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