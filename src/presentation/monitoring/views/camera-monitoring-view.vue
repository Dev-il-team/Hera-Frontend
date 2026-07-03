<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import CameraCardComponent from '../components/camera-card.component.vue';
import LivePlayerComponent from '../components/live-player.component.vue';
import CameraStatusBannerComponent from '../components/camera-status-banner.component.vue';

const { t } = useI18n();

const cameras = [
  {
    id: 1,
    name: t('monitoring.cameras.camera1.name'),
    location: t('monitoring.cameras.camera1.location'),
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200',
    status: t('monitoring.status.online'),
    capturedStatus: t('monitoring.cameras.camera1.capturedStatus')
  },
  {
    id: 2,
    name: t('monitoring.cameras.camera2.name'),
    location: t('monitoring.cameras.camera2.location'),
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200',
    status: t('monitoring.status.online'),
    capturedStatus: t('monitoring.cameras.camera2.capturedStatus')
  },
  {
    id: 3,
    name: t('monitoring.cameras.camera3.name'),
    location: t('monitoring.cameras.camera3.location'),
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200',
    status: t('monitoring.status.online'),
    capturedStatus: t('monitoring.cameras.camera3.capturedStatus')
  }
];

const activeCamera = ref(cameras[2]);

const selectCamera = (camera) => {
  activeCamera.value = camera;
};
</script>

<template>
  <section class="camera-monitoring-container">

    <div class="header-section">
      <h1>{{ t('monitoring.title') }}</h1>

      <p>
        {{ t('monitoring.subtitle') }}
      </p>
    </div>

    <div class="camera-grid">

      <camera-card-component
          v-for="camera in cameras"
          :key="camera.id"
          :camera="camera"
          :is-active="activeCamera.id === camera.id"
          @select-camera="selectCamera"
      />

    </div>

    <live-player-component
        :camera="activeCamera"
    />

    <camera-status-banner-component />

  </section>
</template>

<style scoped>

.camera-monitoring-container {
  padding: 2rem;
  background: #F7F6F2;
  min-height: 100vh;
}

.header-section {
  margin-bottom: 2rem;
}

.header-section h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #0D1B2A;
  margin-bottom: 0.5rem;
}

.header-section p {
  color: #6b7280;
  font-size: 1.1rem;
}

.camera-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media screen and (max-width: 768px) {

  .camera-monitoring-container {
    padding: 1rem;
  }

  .header-section h1 {
    font-size: 2rem;
  }

}

</style>