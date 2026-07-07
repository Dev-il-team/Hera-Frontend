import { createRouter, createWebHistory } from 'vue-router';
import Home from './shared/presentation/views/home.vue';

import DashboardView from '@/energy-analytics/presentation/views/dashboard-view.vue';

import DevicesManagementView
    from './device-iot-management/presentation/views/devices-management-view.vue';

const signInView = () => import('./iam/presentation/views/sign-in.vue');
const signUpView = () => import('./iam/presentation/views/sign-up.vue');

const profileView = () =>
    import('./profile-management/presentation/views/profile-view.vue');

const roomList = () =>
    import('./device-iot-management/presentation/views/room-list.vue');

const subscriptionView = () =>
    import('./subscription-management/presentation/views/subscription-view.vue');

const cameraMonitoringView = () =>
    import('./presentation/monitoring/views/camera-monitoring-view.vue');

const consumptionSummaryView = () =>
    import('./energy-analytics/presentation/views/consumption-summary-view.vue');

const consumptionReportsView = () =>
    import('./energy-analytics/presentation/views/consumption-reports-view.vue');

const cameraList = () =>
    import('./device-iot-management/presentation/views/camera-list.vue');

const routineList = () =>
    import('./automation/presentation/views/routine-list.vue');

const routineForm = () =>
    import('./automation/presentation/views/routine-form.vue');

const notificationList = () =>
    import('./notifications/presentation/views/notification-list.vue');

const about = () => import('./shared/presentation/views/about.vue');
const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const routes = [
    // Public (no session required)
    { path: '/sign-in',             name: 'sign-in',              component: signInView,             meta: { title: 'Sign In',  public: true } },
    { path: '/sign-up',             name: 'sign-up',              component: signUpView,             meta: { title: 'Sign Up',  public: true } },

    { path: '/home',                name: 'home',                 component: Home,                   meta: { title: 'Home' } },
    { path: '/about',               name: 'about',                component: about,                  meta: { title: 'About' } },
    { path: '/subscription',        name: 'subscription',         component: subscriptionView,       meta: { title: 'Subscription' } },
    { path: '/dashboard',           name: 'dashboard',            component: DashboardView,          meta: { title: 'Dashboard' } },
    { path: '/camera-monitoring',   name: 'camera-monitoring',    component: cameraMonitoringView,   meta: { title: 'Camera Monitoring' } },
    { path: '/consumption-summary', name: 'consumption-summary',  component: consumptionSummaryView, meta: { title: 'Consumption Summary' } },
    { path: '/consumption-reports', name: 'consumption-reports',  component: consumptionReportsView, meta: { title: 'Consumption Reports' } },
    { path: '/profile',             name: 'profile',              component: profileView,            meta: { title: 'Profile' } },

    { path: '/devices',             name: 'devices',              component: DevicesManagementView,  meta: { title: 'Devices' } },
    { path: '/devices/cameras',     name: 'cameras',              component: cameraList,             meta: { title: 'Cameras' } },
    { path: '/rooms',               name: 'rooms',                component: roomList,               meta: { title: 'Rooms' } },

    { path: '/routines',            name: 'routines',             component: routineList,            meta: { title: 'Routines' } },
    { path: '/routines/new',        name: 'routine-new',          component: routineForm,            meta: { title: 'New Routine' } },

    { path: '/notifications',       name: 'notifications',        component: notificationList,       meta: { title: 'Notifications' } },

    { path: '/',                    redirect: '/home' },
    { path: '/:pathMatch(.*)*',     name: 'not-found',            component: pageNotFound,           meta: { title: 'Page Not Found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, _from, next) => {
    const baseTitle = 'Hera Platform';
    document.title = `${baseTitle} - ${to.meta['title'] ?? ''}`;

    const isPublic = to.meta['public'] === true;
    const hasSession = !!localStorage.getItem('hera.auth.token');

    // Guard: everything except public routes requires an authenticated session.
    if (!isPublic && !hasSession)
        return next({ name: 'sign-in', query: { redirect: to.fullPath } });

    // Already signed in: skip the auth pages.
    if (isPublic && hasSession)
        return next({ name: 'home' });

    return next();
});

export default router;
