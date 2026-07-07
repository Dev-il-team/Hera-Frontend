/**
 * Application service store for the `Device IoT Management` bounded context.
 *
 * @module useDeviceIotManagementStore
 */
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { DeviceIotManagementApi } from '../infrastructure/device-iot-management-api.js';
import { CameraAssembler } from '../infrastructure/camera.assembler.js';
import { Room } from '../domain/model/room.entity.js';
import { DeviceEntity } from '../domain/model/device.entity.js';

const api = new DeviceIotManagementApi();

const toArray = (data, key) => Array.isArray(data) ? data : (data?.[key] ?? []);

const useDeviceIotManagementStore = defineStore('device-iot-management', () => {
    const cameras = ref([]);
    const camerasLoaded = ref(false);
    const rooms = ref([]);
    const roomsLoaded = ref(false);
    const devices = ref([]);
    const devicesByRoom = ref({});
    const errors = ref([]);

    const camerasCount = computed(() => cameras.value.length);
    const allCamerasOnline = computed(() =>
        cameras.value.length > 0 && cameras.value.every(c => c.connectivityStatus === 'online' && c.operationalStatus !== 'alert')
    );
    const roomsCount = computed(() => rooms.value.length);

    function fetchCameras() {
        api.getCameras().then(response => {
            cameras.value = CameraAssembler.toEntitiesFromResponse(response);
            camerasLoaded.value = true;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function getCameraById(id) {
        const idNum = parseInt(id);
        return cameras.value.find(c => c.id === idNum);
    }

    /**
     * Registers a surveillance camera (POST /cameras).
     * @param {{name: string, location: string, streamUrl: string}} resource
     */
    async function registerCamera(resource) {
        const response = await api.registerCamera(resource);
        fetchCameras();
        return response.data;
    }

    async function fetchRooms() {
        try {
            const response = await api.getRooms();
            rooms.value = toArray(response.data, 'rooms').map(r => new Room(r));
            roomsLoaded.value = true;
        } catch (error) {
            errors.value.push(error);
            throw error;
        }
    }

    /**
     * Creates a room (POST /rooms).
     * @param {{name: string}} resource
     */
    async function addRoom(resource) {
        const response = await api.createRoom(resource);
        const created = new Room(response.data ?? {});
        rooms.value.push(created);
        return created;
    }

    async function fetchDevices() {
        try {
            const response = await api.getDevices();
            devices.value = toArray(response.data, 'devices').map(d => new DeviceEntity(d));
        } catch (error) {
            errors.value.push(error);
            throw error;
        }
    }

    /** Loads the devices of a room (GET /rooms/{roomId}/devices). */
    async function fetchDevicesByRoom(roomId) {
        const response = await api.getDevicesByRoomId(roomId);
        const list = toArray(response.data, 'devices').map(d => new DeviceEntity(d));
        devicesByRoom.value = { ...devicesByRoom.value, [roomId]: list };
        return list;
    }

    /**
     * Links a new IoT device (POST /devices).
     * @param {{name: string, type: number, roomId: number}} resource
     */
    async function registerDevice(resource) {
        const response = await api.registerDevice(resource);
        if (resource.roomId != null) await fetchDevicesByRoom(resource.roomId);
        return response.data;
    }

    return {
        cameras,
        camerasLoaded,
        rooms,
        roomsLoaded,
        devices,
        devicesByRoom,
        errors,
        camerasCount,
        allCamerasOnline,
        roomsCount,
        fetchCameras,
        getCameraById,
        registerCamera,
        fetchRooms,
        addRoom,
        fetchDevices,
        fetchDevicesByRoom,
        registerDevice
    };
});

export default useDeviceIotManagementStore;
