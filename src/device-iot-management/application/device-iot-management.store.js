/**
 * Application service store for the `Device IoT Management` bounded context.
 *
 * @module useDeviceIotManagementStore
 */
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { DeviceIotManagementApi } from '../infrastructure/device-iot-management-api.js';
import { CameraAssembler } from '../infrastructure/camera.assembler.js';

const api = new DeviceIotManagementApi();

const useDeviceIotManagementStore = defineStore('device-iot-management', () => {
    const cameras = ref([]);
    const camerasLoaded = ref(false);
    const errors = ref([]);

    const camerasCount = computed(() => cameras.value.length);
    const allCamerasOnline = computed(() =>
        cameras.value.length > 0 && cameras.value.every(c => c.connectivityStatus === 'online' && c.operationalStatus !== 'alert')
    );

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

    return {
        cameras,
        camerasLoaded,
        errors,
        camerasCount,
        allCamerasOnline,
        fetchCameras,
        getCameraById
    };
});

export default useDeviceIotManagementStore;
