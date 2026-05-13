/**
 * Application service store for the `Notifications` bounded context.
 *
 * @module useNotificationsStore
 */
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { NotificationsApi } from '../infrastructure/notifications-api.js';
import { NotificationAssembler } from '../infrastructure/notification.assembler.js';

const api = new NotificationsApi();

const useNotificationsStore = defineStore('notifications', () => {
    const notifications = ref([]);
    const notificationsLoaded = ref(false);
    const errors = ref([]);

    const notificationsCount = computed(() => notifications.value.length);
    const unreadCount = computed(() => notifications.value.filter(n => !n.read).length);

    function fetchNotifications() {
        api.getNotifications().then(response => {
            notifications.value = NotificationAssembler.toEntitiesFromResponse(response);
            notificationsLoaded.value = true;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function getNotificationById(id) {
        const idNum = parseInt(id);
        return notifications.value.find(n => n.id === idNum);
    }

    return {
        notifications,
        notificationsLoaded,
        errors,
        notificationsCount,
        unreadCount,
        fetchNotifications,
        getNotificationById
    };
});

export default useNotificationsStore;
