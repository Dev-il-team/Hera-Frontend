<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  chartValues: {
    type: Array,
    required: true
  },
  highestDay: {
    type: String,
    required: true
  },
  highestValue: {
    type: String,
    required: true
  }
});

const { t } = useI18n();

const chartData = computed(() => ({
  labels: ['18 May', '19 May', '20 May', '21 May', '22 May', '23 May', '24 May'],
  datasets: [
    {
      label: t('consumptionSummary.chart.datasetLabel'),
      data: props.chartValues,
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.2)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#60a5fa',
      pointBorderColor: '#60a5fa',
      pointRadius: 4,
      pointHoverRadius: 6
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#d1d5db'
      },
      grid: {
        color: 'rgba(255,255,255,0.08)'
      }
    },
    y: {
      ticks: {
        color: '#d1d5db'
      },
      grid: {
        color: 'rgba(255,255,255,0.08)'
      }
    }
  }
};
</script>

<template>
  <pv-card class="chart-card">
    <template #content>
      <div class="chart-header">
        <h2>{{ t('consumptionSummary.chart.title') }}</h2>

        <pv-tag
            :value="t('consumptionSummary.chart.daily')"
            severity="info"
        />
      </div>

      <div class="chart-container">
        <pv-chart
            type="line"
            :data="chartData"
            :options="chartOptions"
        />
      </div>

      <div class="chart-footer">
        <i class="pi pi-bolt"></i>

        <span>
          {{ t('consumptionSummary.chart.highestConsumption', { day: highestDay, value: highestValue }) }}
        </span>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.chart-card {
  border-radius: 24px;
  overflow: hidden;

  background: linear-gradient(
      135deg,
      #0D1B2A,
      #1B263B
  );

  color: white;
  border: none;
  box-shadow: 0 12px 24px rgba(13,27,42,0.2);
  height: 100%;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.chart-header h2 {
  font-size: 1.4rem;
  font-weight: 700;
}

.chart-container {
  height: 220px;
}

.chart-footer {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: rgba(255,255,255,0.06);
  padding: 1rem;
  border-radius: 16px;
  color: #dbeafe;
}

.chart-footer i {
  color: #60a5fa;
}
</style>