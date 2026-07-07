import { BaseApi } from '../../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../../shared/infrastructure/base-endpoint.js';

const devicesEndpointPath = import.meta.env.VITE_DEVICES_ENDPOINT_PATH ?? '/devices';

/**
 * Service for the Devices endpoints.
 * Extends BaseApi so every request carries the JWT Bearer token
 * and uses the normalized platform base URL.
 *
 * @class DeviceApiService
 * @extends BaseApi
 */
export class DeviceApiService extends BaseApi {
    #endpoint;

    constructor() {
        super();
        this.#endpoint = new BaseEndpoint(this, devicesEndpointPath);
    }

    /** GET /api/v1/devices */
    async getAll() {
        const response = await this.#endpoint.getAll();
        return response.data;
    }

    /** GET /api/v1/devices/{deviceId} */
    async getById(id) {
        const response = await this.#endpoint.getById(id);
        return response.data;
    }

    /**
     * POST /api/v1/devices — Link a new IoT device.
     * @param {{name: string, type: number, roomId: number}} device
     */
    async create(device) {
        const response = await this.#endpoint.create(device);
        return response.data;
    }
}
