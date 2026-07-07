/**
 * Application service store for the `Subscription Management` bounded context.
 *
 * @module useSubscriptionManagementStore
 */
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { SubscriptionManagementApi } from '../infrastructure/subscription-management-api.js';

const api = new SubscriptionManagementApi();

const useSubscriptionManagementStore = defineStore('subscription-management', () => {
    const subscriptions = ref([]);
    const subscriptionsLoaded = ref(false);
    const errors = ref([]);

    /** Latest subscription is considered the active one. */
    const activeSubscription = computed(() =>
        subscriptions.value.length ? subscriptions.value[subscriptions.value.length - 1] : null
    );

    async function fetchSubscriptions() {
        try {
            const response = await api.getSubscriptions();
            const data = response.data;
            subscriptions.value = Array.isArray(data) ? data : (data?.subscriptions ?? []);
            subscriptionsLoaded.value = true;
        } catch (error) {
            errors.value.push(error);
            throw error;
        }
    }

    /**
     * Subscribes (POST /subscriptions) and refreshes the list.
     * @param {Object} resource - Payload expected by the backend (e.g. plan info).
     */
    async function subscribe(resource) {
        const response = await api.subscribe(resource);
        await fetchSubscriptions().catch(() => {});
        return response.data;
    }

    return {
        subscriptions,
        subscriptionsLoaded,
        errors,
        activeSubscription,
        fetchSubscriptions,
        subscribe
    };
});

export default useSubscriptionManagementStore;
