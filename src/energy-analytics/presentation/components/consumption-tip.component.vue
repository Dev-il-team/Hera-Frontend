<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  tip: {
    type: String,
    required: true
  }
});
</script>

<template>
  <pv-card class="tip-card">
    <template #content>
      <div class="tip-content">
        <div class="tip-icon">
          <i class="pi pi-lightbulb"></i>
        </div>

        <div>
          <h2>{{ t('consumptionSummary.tip.title') }}</h2>

          <p>
            {{ tip }}
          </p>
        </div>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.tip-card {
  border-radius: 24px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  min-height: 220px;
}

.tip-content {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.tip-icon {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  background: rgba(212,175,55,0.15);
  color: #D4AF37;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.5rem;
}

.tip-content h2 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #0D1B2A;
  margin-bottom: 0.6rem;
}

.tip-content p {
  color: #4b5563;
  line-height: 1.6;
}

@media screen and (max-width: 768px) {
  .tip-content {
    flex-direction: column;
  }
}
</style>