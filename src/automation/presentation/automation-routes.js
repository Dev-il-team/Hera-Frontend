const routineList = () => import('./views/routine-list.vue');
const routineForm = () => import('./views/routine-form.vue');

/**
 * Child routes exposed by the Automation presentation layer.
 *
 * @type {import('vue-router').RouteRecordRaw[]}
 */
const automationRoutes = [
    { path: 'routines',     name: 'routines',     component: routineList, meta: { title: 'Routines' } },
    { path: 'routines/new', name: 'routine-new',  component: routineForm, meta: { title: 'New Routine' } }
];

export default automationRoutes;
