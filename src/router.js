import { createRouter, createWebHistory } from 'vue-router';
import Home from './shared/presentation/views/home.vue';
import deviceIotManagementRoutes from './device-iot-management/presentation/device-iot-management-routes.js';
import automationRoutes from './automation/presentation/automation-routes.js';
import notificationsRoutes from './notifications/presentation/notifications-routes.js';

const about = () => import('./shared/presentation/views/about.vue');
const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const routes = [
    { path: '/home',            name: 'home',          component: Home,        meta: { title: 'Home' } },
    { path: '/about',           name: 'about',         component: about,       meta: { title: 'About' } },
    { path: '/devices',         children: deviceIotManagementRoutes },
    { path: '/automation',      children: automationRoutes },
    { path: '/notifications',   children: notificationsRoutes },
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
