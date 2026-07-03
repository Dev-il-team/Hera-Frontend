<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  camera: {
    type: Object,
    required: true
  }
});
</script>

<template>

  <pv-card class="live-player-card">

    <template #content>

      <div class="live-header">

        <div class="live-title">

          <span class="live-badge">
            {{ t('monitoring.live') }}
          </span>

          <h2>
            {{ t('monitoring.livePlayer') }} - {{ camera.name }}
          </h2>

        </div>

      </div>

      <div class="video-container">

        <img
            :src="camera.image"
            :alt="camera.name"
            class="live-image"
        >

        <div class="overlay-status">
          {{ camera.location }}
        </div>

      </div>

      <div class="player-details">

        <p>
          {{ t('monitoring.capturedStatus') }}: {{ camera.capturedStatus }}
        </p>

        <span>
          {{ t('monitoring.lastUpdate') }}
        </span>

      </div>

    </template>

  </pv-card>

</template>

<style scoped>

.live-player-card {
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  margin-bottom: 2rem;
}

.live-header {
  margin-bottom: 1.5rem;
}

.live-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.live-title h2 {
  font-size: 1.5rem;
  color: #0D1B2A;
  font-weight: 700;
}

.live-badge {
  background: #dc2626;
  color: white;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.video-container {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.live-image {
  width: 100%;
  height: 480px;
  object-fit: cover;
  display: block;
}

.overlay-status {
  position: absolute;
  bottom: 20px;
  left: 20px;

  background: rgba(0,0,0,0.7);
  color: white;

  padding: 0.7rem 1rem;
  border-radius: 12px;

  font-weight: 600;
  backdrop-filter: blur(8px);
}

.player-details p {
  font-size: 1.1rem;
  font-weight: 600;
  color: #0D1B2A;
  margin-bottom: 0.5rem;
}

.player-details span {
  color: #6b7280;
}

@media screen and (max-width: 768px) {

  .live-image {
    height: 260px;
  }

  .live-title h2 {
    font-size: 1.2rem;
  }

}

</style>