<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>

  <div class="status-banner">

    <div class="status-content">

      <i class="pi pi-shield status-icon"></i>

      <div>

        <h3>
          {{ t('monitoring.activeCamera') }}
        </h3>

        <p>
          {{ t('monitoring.activeCameraDescription') }}
        </p>

      </div>

    </div>

  </div>

</template>

<style scoped>

.status-banner {
  background: linear-gradient(
      135deg,
      #0D1B2A,
      #1B263B
  );

  border-radius: 24px;
  padding: 1.5rem;

  color: white;

  box-shadow: 0 10px 24px rgba(13,27,42,0.2);
}

.status-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-icon {
  font-size: 2rem;
  color: #D4AF37;
}

.status-content h3 {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  font-weight: 700;
}

.status-content p {
  color: rgba(255,255,255,0.8);
}

@media screen and (max-width: 768px) {

  .status-content {
    align-items: flex-start;
  }

}

</style>