import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const camerasEndpointPath = import.meta.env.VITE_CAMERAS_ENDPOINT_PATH;

/**
 * Infrastructure service gateway for the Device IoT Management bounded-context endpoints.
 *
 * @class DeviceIotManagementApi
 * @extends BaseApi
 */
export class DeviceIotManagementApi extends BaseApi {
    #camerasEndpoint;

    constructor() {
        super();
        this.#camerasEndpoint = new BaseEndpoint(this, camerasEndpointPath);
    }

    /** @returns {Promise<import('axios').AxiosResponse>} */
    getCameras() { return this.#camerasEndpoint.getAll(); }

    /** @param {number|string} id */
    getCameraById(id) { return this.#camerasEndpoint.getById(id); }
}
