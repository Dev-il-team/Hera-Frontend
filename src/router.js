import { createRouter, createWebHistory } from 'vue-router';
import Home from './shared/presentation/views/home.vue';

import DashboardView from '@/energy-analytics/presentation/views/dashboard-view.vue';

import DevicesManagementView
    from './device-iot-management/presentation/views/devices-management-view.vue';


const subscriptionView = () =>
    import('./subscription-management/presentation/views/subscription-view.vue');

const cameraMonitoringView = () =>
    import('./presentation/monitoring/views/camera-monitoring-view.vue');

const consumptionSummaryView = () =>
    import('./energy-analytics/presentation/views/consumption-summary-view.vue');

import deviceIotManagementRoutes from './device-iot-management/presentation/device-iot-management-routes.js';



const about = () => import('./shared/presentation/views/about.vue');
const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const routes = [

    { path: '/home', name: 'home', component: Home, meta: { title: 'Home' } },
    { path: '/about', name: 'about', component: about, meta: { title: 'About' } },
    {
        path: '/subscription',
        name: 'subscription',
        component: subscriptionView,
        meta: { title: 'Subscription' }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: { title: 'Dashboard' }
    },
    {
        path: '/camera-monitoring',
        name: 'camera-monitoring',
        component: cameraMonitoringView,
        meta: { title: 'Camera Monitoring' }
    },
    {
        path: '/consumption-summary',
        name: 'consumption-summary',
        component: consumptionSummaryView,
        meta: { title: 'Consumption Summary' }
    },

    {
        path: '/profile',
        name: 'profile',
        component: DashboardView
    },
    {
        path: '/devices',
        name: 'devices',
        component: DevicesManagementView,
        meta: {
            title: 'Devices'
        }
    },


    { path: '/devices',         children: deviceIotManagementRoutes },
    { path: '/',                redirect: '/home' },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: pageNotFound, meta: { title: 'Page Not Found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, _from, next) => {
    const baseTitle = 'Hera Platform';


    document.title = `${baseTitle} - ${to.meta['title'] ?? ''}`;

    return next();
});

export default router;