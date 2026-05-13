<script setup>
import { useI18n } from 'vue-i18n';
import { onMounted, ref, computed, toRefs } from 'vue';
import useNotificationsStore from '../../application/notifications.store.js';
import NotificationItem from '../components/notification-item.vue';

const { t } = useI18n();
const store = useNotificationsStore();
const { notifications, notificationsLoaded, errors } = toRefs(store);
const { fetchNotifications } = store;

const filter = ref(null);
const filterOptions = computed(() => [
  { label: t('notifications.filter.all'),        value: null },
  { label: t('notifications.filter.security'),   value: 'security' },
  { label: t('notifications.filter.energy'),     value: 'energy' },
  { label: t('notifications.filter.automation'), value: 'automation' }
]);

const visible = computed(() =>
  filter.value ? notifications.value.filter(n => n.category === filter.value) : notifications.value
);

onMounted(() => {
  if (!notificationsLoaded.value) fetchNotifications();
});
</script>

<template>
  <div class="p-4">
    <div class="flex justify-content-between align-items-start mb-3">
      <div>
        <h1 class="mb-1">{{ t('notifications.title') }}</h1>
        <p class="text-secondary m-0">{{ t('notifications.subtitle') }}</p>
      </div>
      <pv-select
          v-model="filter"
          :options="filterOptions"
          option-label="label"
          option-value="value"
          :placeholder="t('notifications.filter-placeholder')"
          class="w-15rem"
      />
    </div>

    <div v-if="!notificationsLoaded" class="p-4 text-center">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>

    <div v-else-if="visible.length === 0" class="text-secondary text-center p-4">
      {{ t('notifications.empty') }}
    </div>

    <div v-else>
      <notification-item v-for="n in visible" :key="n.id" :notification="n" />
    </div>

    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
    </div>
  </div>
</template>
