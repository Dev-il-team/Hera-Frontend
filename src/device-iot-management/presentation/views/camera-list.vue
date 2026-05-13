<script setup>
import { useI18n } from 'vue-i18n';
import { onMounted, toRefs } from 'vue';
import useDeviceIotManagementStore from '../../application/device-iot-management.store.js';
import CameraCard from '../components/camera-card.vue';

const { t } = useI18n();
const store = useDeviceIotManagementStore();
const { cameras, camerasLoaded, errors, allCamerasOnline } = toRefs(store);
const { fetchCameras } = store;

onMounted(() => {
  if (!camerasLoaded.value) fetchCameras();
});
</script>

<template>
  <div class="p-4">
    <h1>{{ t('cameras.device-title') }}</h1>
    <p class="text-secondary">{{ t('cameras.device-subtitle') }}</p>

    <h2 class="mt-4">{{ t('cameras.my-cameras') }}</h2>

    <div v-if="!camerasLoaded" class="p-4 text-center">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>

    <div v-else class="grid">
      <div v-for="camera in cameras" :key="camera.id" class="col-12 md:col-6 lg:col-4">
        <camera-card :camera="camera" />
      </div>
    </div>

    <pv-card v-if="camerasLoaded && allCamerasOnline" class="mt-4 status-banner">
      <template #content>
        <div class="flex align-items-center">
          <i class="pi pi-shield text-primary mr-3" style="font-size: 1.5rem"></i>
          <div>
            <strong>{{ t('cameras.all-ok-title') }}</strong>
            <div class="text-sm text-secondary">{{ t('cameras.all-ok-subtitle') }}</div>
          </div>
        </div>
      </template>
    </pv-card>

    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
    </div>
  </div>
</template>

<style scoped>
.status-banner {
  border-left: 4px solid var(--primary-color);
}
</style>
