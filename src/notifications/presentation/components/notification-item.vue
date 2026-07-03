<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { iconForCategory, colorForSeverity, routeForRelatedEntity } from '../../domain/model/notification.entity.js';

const props = defineProps({
  notification: { type: Object, required: true }
});

const { t } = useI18n();
const router = useRouter();

const icon = computed(() => iconForCategory(props.notification.category));
const color = computed(() => colorForSeverity(props.notification.severity));
const route = computed(() => routeForRelatedEntity(props.notification));

const occurredLabel = computed(() => {
  const iso = props.notification.occurredAt;
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString();
});

const onClick = () => { if (route.value) router.push(route.value); };
</script>

<template>
  <div class="notification-item" :style="{ borderLeftColor: color }" @click="onClick" :class="{ clickable: !!route }">
    <div class="icon-wrap" :style="{ backgroundColor: color + '22', color }">
      <i :class="icon" style="font-size: 1.25rem"></i>
    </div>
    <div class="flex-1">
      <div class="title">{{ notification.title }}</div>
      <div class="body text-sm text-secondary">{{ notification.body }}</div>
    </div>
    <div class="timestamp text-sm text-secondary">{{ occurredLabel }}</div>
    <i v-if="route" class="pi pi-chevron-right text-secondary ml-2"></i>
  </div>
</template>

<style scoped>
.notification-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-left: 4px solid #ccc;
  border-radius: 6px;
  background: #fff;
  margin-bottom: 10px;
}
.notification-item.clickable { cursor: pointer; }
.notification-item.clickable:hover { background: #fafafa; }
.icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.title { font-weight: 500; }
.timestamp { white-space: nowrap; }

@media screen and (max-width: 768px) {
  .notification-item {
    align-items: flex-start;
  }

  .timestamp {
    white-space: normal;
    text-align: right;
    max-width: 7rem;
  }
}

@media screen and (max-width: 576px) {
  .notification-item {
    flex-wrap: wrap;
  }

  .timestamp {
    width: 100%;
    max-width: none;
    text-align: left;
    margin-left: 52px;
  }
}
</style>
