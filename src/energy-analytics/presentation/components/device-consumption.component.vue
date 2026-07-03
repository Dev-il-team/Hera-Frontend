<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  devices: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <pv-card class="device-card">
    <template #content>
      <div class="device-header">
        <h2>{{ t('consumptionSummary.devices.title') }}</h2>
        <span>{{ t('consumptionSummary.devices.subtitle') }}</span>
      </div>

      <div class="device-list">
        <div
            v-for="device in devices"
            :key="device.name"
            class="device-item"
        >
          <div class="device-info">
            <div class="device-icon">
              <i :class="device.icon"></i>
            </div>

            <div>
              <h3>{{ device.name }}</h3>
              <p>{{ device.consumption }}</p>
            </div>
          </div>

          <div class="device-progress">
            <span>{{ device.percentage }}%</span>

            <div class="progress-track">
              <div
                  class="progress-fill"
                  :style="{ width: `${device.percentage}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.device-card {
  border-radius: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  height: 100%;
}

.device-header {
  margin-bottom: 1.2rem;
}

.device-header h2 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0D1B2A;
  margin-bottom: 0.3rem;
}

.device-header span {
  color: #6b7280;
}

.device-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.device-item {
  padding: 0.9rem;
  border-radius: 18px;
  background: #F7F6F2;
  border: 1px solid #e5e7eb;
}

.device-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.7rem;
}

.device-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: rgba(212,175,55,0.15);
  color: #D4AF37;

  display: flex;
  align-items: center;
  justify-content: center;
}

.device-info h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #0D1B2A;
  margin-bottom: 0.2rem;
}

.device-info p {
  color: #6b7280;
  font-size: 0.9rem;
}

.device-progress {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.device-progress span {
  width: 38px;
  font-weight: 700;
  color: #0D1B2A;
  font-size: 0.9rem;
}

.progress-track {
  flex: 1;
  height: 8px;
  background: #dbe3ec;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #34c7a1;
  border-radius: 999px;
}
</style>