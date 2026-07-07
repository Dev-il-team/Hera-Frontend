import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const camerasEndpointPath = import.meta.env.VITE_CAMERAS_ENDPOINT_PATH ?? '/cameras';
const devicesEndpointPath = import.meta.env.VITE_DEVICES_ENDPOINT_PATH ?? '/devices';
const roomsEndpointPath = import.meta.env.VITE_ROOMS_ENDPOINT_PATH ?? '/rooms';

/**
 * Infrastructure service gateway for the Device IoT Management bounded-context endpoints.
 *
 * @class DeviceIotManagementApi
 * @extends BaseApi
 */
export class DeviceIotManagementApi extends BaseApi {
    #camerasEndpoint;
    #devicesEndpoint;
    #roomsEndpoint;

    constructor() {
        super();
        this.#camerasEndpoint = new BaseEndpoint(this, camerasEndpointPath);
        this.#devicesEndpoint = new BaseEndpoint(this, devicesEndpointPath);
        this.#roomsEndpoint = new BaseEndpoint(this, roomsEndpointPath);
    }

    // --- Cameras ---

    /** GET /api/v1/cameras */
    getCameras() { return this.#camerasEndpoint.getAll(); }

    /** GET /api/v1/cameras/{cameraId} */
    getCameraById(id) { return this.#camerasEndpoint.getById(id); }

    /**
     * POST /api/v1/cameras — Register a surveillance camera.
     * @param {{name: string, location: string, streamUrl: string}} resource
     */
    registerCamera(resource) { return this.#camerasEndpoint.create(resource); }

    // --- Devices ---

    /** GET /api/v1/devices */
    getDevices() { return this.#devicesEndpoint.getAll(); }

    /** GET /api/v1/devices/{deviceId} */
    getDeviceById(id) { return this.#devicesEndpoint.getById(id); }

    /**
     * POST /api/v1/devices — Link a new IoT device to the platform.
     * @param {{name: string, type: number, roomId: number}} resource
     */
    registerDevice(resource) { return this.#devicesEndpoint.create(resource); }

    // --- Rooms ---

    /** GET /api/v1/rooms */
    getRooms() { return this.#roomsEndpoint.getAll(); }

    /** GET /api/v1/rooms/{roomId} */
    getRoomById(id) { return this.#roomsEndpoint.getById(id); }

    /**
     * POST /api/v1/rooms — Create a new room.
     * @param {{name: string}} resource
     */
    createRoom(resource) { return this.#roomsEndpoint.create(resource); }

    /** GET /api/v1/rooms/{roomId}/devices — All devices in a room. */
    getDevicesByRoomId(roomId) {
        return this.http.get(`${roomsEndpointPath}/${roomId}/devices`);
    }
}
