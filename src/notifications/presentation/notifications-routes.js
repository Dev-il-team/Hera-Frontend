const notificationList = () => import('./views/notification-list.vue');

/**
 * Child routes exposed by the Notifications presentation layer.
 *
 * @type {import('vue-router').RouteRecordRaw[]}
 */
const notificationsRoutes = [
    { path: '', name: 'notifications', component: notificationList, meta: { title: 'Notifications' } }
];

export default notificationsRoutes;
