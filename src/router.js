import { createRouter, createWebHistory } from 'vue-router';
import Home from './shared/presentation/views/home.vue';
import DashboardView from '@/energy-analytics/presentation/views/dashboard-view.vue'

const subscriptionView = () =>
    import('./subscription-management/presentation/views/subscription-view.vue');

const about = () => import('./shared/presentation/views/about.vue');
const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const routes = [
    { path: '/home',            name: 'home',      component: Home,        meta: { title: 'Home' } },
    { path: '/about',           name: 'about',     component: about,       meta: { title: 'About' } },
    {
        path: '/subscription',
        name: 'subscription',
        component: subscriptionView,
        meta: { title: 'Subscription' }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView
    },
    { path: '/',                redirect: '/home' },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: pageNotFound, meta: { title: 'Page Not Found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, _from, next) => {
    let baseTitle = 'Hera Platform';
    document.title = `${baseTitle} - ${to.meta['title']}`;
    return next();
});

export default router;
