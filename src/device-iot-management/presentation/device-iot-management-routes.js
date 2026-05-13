const deviceList = () => import('./views/device-list.vue');
const cameraList = () => import('./views/camera-list.vue');

/**
 * Child routes exposed by the Device IoT Management presentation layer.
 *
 * @type {import('vue-router').RouteRecordRaw[]}
 */
const deviceIotManagementRoutes = [
    { path: '',        name: 'devices', component: deviceList, meta: { title: 'Devices' } },
    { path: 'cameras', name: 'cameras', component: cameraList, meta: { title: 'Cameras' } }
];

export default deviceIotManagementRoutes;
