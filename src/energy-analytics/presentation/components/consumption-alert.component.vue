<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  alert: {
    type: String,
    required: true
  },
  previousConsumption: {
    type: String,
    required: true
  },
  currentConsumption: {
    type: String,
    required: true
  },
  difference: {
    type: String,
    required: true
  }
});
</script>

<template>

  <pv-card class="alert-card">

    <template #content>

      <div class="alert-header">

        <div class="alert-icon">
          <i class="pi pi-exclamation-triangle"></i>
        </div>

        <div>

          <h2>
            {{ t('consumptionSummary.alert.title') }}
          </h2>

          <p>
            {{ alert }}
          </p>

        </div>

      </div>

      <div class="alert-details">

        <div class="alert-item">

          <span class="label">
            {{ t('consumptionSummary.alert.previousMonth') }}
          </span>

          <strong>
            {{ previousConsumption }}
          </strong>

        </div>

        <div class="alert-item">

          <span class="label">
            {{ t('consumptionSummary.alert.currentMonth') }}
          </span>

          <strong>
            {{ currentConsumption }}
          </strong>

        </div>

        <div class="alert-item">

          <span class="label">
            {{ t('consumptionSummary.alert.difference') }}
          </span>

          <strong
              :class="difference.includes('+')
                ? 'increase'
                : 'decrease'"
          >
            {{ difference }}
          </strong>

        </div>

      </div>

      <div class="alert-footer">

        <i class="pi pi-info-circle"></i>

        <span>
          {{ t('consumptionSummary.alert.footer') }}
        </span>

      </div>

    </template>

  </pv-card>

</template>

<style scoped>

.alert-card {
  border-radius: 24px;

  background: linear-gradient(
      135deg,
      #7f1d1d,
      #991b1b
  );

  color: white;

  border: none;

  box-shadow: 0 12px 24px rgba(127,29,29,0.25);

  min-height: 220px;
}

.alert-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  margin-bottom: 1.5rem;
}

.alert-icon {
  width: 56px;
  height: 56px;

  border-radius: 18px;

  background: rgba(255,255,255,0.12);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.5rem;

  color: #fca5a5;
}

.alert-header h2 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.alert-header p {
  color: rgba(255,255,255,0.8);
}

.alert-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-bottom: 1.5rem;
}

.alert-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.9rem 1rem;

  border-radius: 14px;

  background: rgba(255,255,255,0.08);
}

.label {
  color: rgba(255,255,255,0.75);
}

.increase {
  color: #fecaca;
}

.decrease {
  color: #bbf7d0;
}

.alert-footer {
  display: flex;
  align-items: center;
  gap: 0.7rem;

  color: rgba(255,255,255,0.85);

  background: rgba(255,255,255,0.08);

  padding: 1rem;
  border-radius: 14px;
}

@media screen and (max-width: 768px) {

  .alert-header {
    flex-direction: column;
  }

}

</style>