<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  camera: {
    type: Object,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select-camera']);

const selectCamera = (camera) => {
  emit('select-camera', camera);
};
</script>

<template>

  <pv-card class="camera-card">

    <template #content>

      <div class="camera-header">

        <div class="camera-title-container">
          <i class="pi pi-video camera-icon"></i>

          <h3>{{ camera.name }}</h3>
        </div>

        <span class="camera-status">
          <span class="status-dot"></span>
          {{ camera.status }}
        </span>

      </div>

      <img
          :src="camera.image"
          :alt="camera.name"
          class="camera-image"
      >

      <pv-button
          :label="t('monitoring.viewStream')"
          icon="pi pi-eye"
          class="view-button"
          :aria-label="t('monitoring.viewStreamAria')"
          @click="selectCamera(camera)"
      />

    </template>

  </pv-card>

</template>

<style scoped>

.camera-card {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
}

.camera-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0,0,0,0.12);
}

.camera-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.camera-title-container {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.camera-title-container h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #0D1B2A;
}

.camera-icon {
  color: #D4AF37;
  font-size: 1.2rem;
}

.camera-status {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: #4b5563;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
}

.camera-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 1rem;
}

.view-button {
  width: 100%;
  background: #D4AF37;
  border: none;
  color: #0D1B2A;
  font-weight: 600;
}

.view-button:hover {
  background: #c19b24 !important;
}

</style>