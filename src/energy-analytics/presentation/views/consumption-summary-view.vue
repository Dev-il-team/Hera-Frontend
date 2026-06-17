<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import SummaryCardComponent from '../components/summary-card.component.vue';
import ConsumptionChartComponent from '../components/consumption-chart.component.vue';
import DeviceConsumptionComponent from '../components/device-consumption.component.vue';
import ConsumptionTipComponent from '../components/consumption-tip.component.vue';
import ConsumptionAlertComponent from '../components/consumption-alert.component.vue';

const selectedMonth = ref('may-2025');

const { t } = useI18n();

const monthOptions = computed(() => [
  { label: t('consumptionSummary.months.may2025'), value: 'may-2025' },
  { label: t('consumptionSummary.months.april2025'), value: 'apr-2025' },
  { label: t('consumptionSummary.months.march2025'), value: 'mar-2025' }
]);

const monthlyData = {
  'may-2025': {
    consumption: '156.4 kWh',
    cost: 'S/ 78.20',
    average: '5.05 kWh',
    remainingDays: '12 días',
    comparison: '+8.5% vs abril 2025',
    costComparison: '+6.3% vs abril 2025',
    averageComparison: '+0.5 kWh vs abril 2025',
    period: 'Periodo: 1 - 31 May 2025',
    chartValues: [13, 19, 14, 18, 15, 11, 13],
    highestDay: '19 de mayo',
    highestValue: '19 kWh',
    devices: [
      { name: 'Aire acondicionado', consumption: '48.2 kWh', percentage: 31, icon: 'pi pi-sun' },
      { name: 'Refrigeradora', consumption: '36.7 kWh', percentage: 23, icon: 'pi pi-box' },
      { name: 'Lavadora', consumption: '22.4 kWh', percentage: 14, icon: 'pi pi-refresh' }
    ],
    tip: 'El aire acondicionado representa el mayor consumo del mes. Reducir su uso 1 hora diaria podría ahorrar aproximadamente 9.6 kWh al mes.',
    alert: 'Tu consumo aumentó 8.5% respecto al mes anterior.',
    previousConsumption: '144.1 kWh',
    currentConsumption: '156.4 kWh',
    difference: '+12.3 kWh'
  },
  'apr-2025': {
    consumption: '144.1 kWh',
    cost: 'S/ 72.10',
    average: '4.80 kWh',
    remainingDays: '0 días',
    comparison: '-3.2% vs marzo 2025',
    costComparison: '-2.8% vs marzo 2025',
    averageComparison: '-0.2 kWh vs marzo 2025',
    period: 'Periodo: 1 - 30 Abr 2025',
    chartValues: [12, 15, 13, 16, 14, 11, 10],
    highestDay: '21 de abril',
    highestValue: '16 kWh',
    devices: [
      { name: 'Refrigeradora', consumption: '39.4 kWh', percentage: 27, icon: 'pi pi-box' },
      { name: 'Televisor', consumption: '28.1 kWh', percentage: 19, icon: 'pi pi-desktop' },
      { name: 'Iluminación', consumption: '21.7 kWh', percentage: 15, icon: 'pi pi-lightbulb' }
    ],
    tip: 'La refrigeradora fue el dispositivo con mayor consumo. Revisar el sellado de la puerta puede reducir el gasto energético.',
    alert: 'Tu consumo disminuyó 3.2% respecto al mes anterior.',
    previousConsumption: '148.9 kWh',
    currentConsumption: '144.1 kWh',
    difference: '-4.8 kWh'
  },
  'mar-2025': {
    consumption: '148.9 kWh',
    cost: 'S/ 74.45',
    average: '4.95 kWh',
    remainingDays: '0 días',
    comparison: '+4.1% vs febrero 2025',
    costComparison: '+3.7% vs febrero 2025',
    averageComparison: '+0.3 kWh vs febrero 2025',
    period: 'Periodo: 1 - 31 Mar 2025',
    chartValues: [10, 14, 18, 15, 13, 17, 12],
    highestDay: '20 de marzo',
    highestValue: '18 kWh',
    devices: [
      { name: 'Lavadora', consumption: '34.6 kWh', percentage: 23, icon: 'pi pi-refresh' },
      { name: 'Aire acondicionado', consumption: '32.8 kWh', percentage: 22, icon: 'pi pi-sun' },
      { name: 'Microondas', consumption: '18.9 kWh', percentage: 13, icon: 'pi pi-stopwatch' }
    ],
    tip: 'La lavadora tuvo alto consumo. Usar ciclos cortos y cargas completas puede optimizar el uso de energía.',
    alert: 'Tu consumo aumentó 4.1% respecto al mes anterior.',
    previousConsumption: '143.0 kWh',
    currentConsumption: '148.9 kWh',
    difference: '+5.9 kWh'
  }
};

const currentData = computed(() => monthlyData[selectedMonth.value]);

const summaryCards = computed(() => [
  {
    title: t('consumptionSummary.cards.totalConsumption'),
    value: currentData.value.consumption,
    subtitle: currentData.value.comparison,
    icon: 'pi pi-bolt',
    color: '#3b82f6'
  },
  {
    title: t('consumptionSummary.cards.estimatedCost'),
    value: currentData.value.cost,
    subtitle: currentData.value.costComparison,
    icon: 'pi pi-wallet',
    color: '#22c55e'
  },
  {
    title: t('consumptionSummary.cards.dailyAverage'),
    value: currentData.value.average,
    subtitle: currentData.value.averageComparison,
    icon: 'pi pi-chart-line',
    color: '#8b5cf6'
  },
  {
    title: t('consumptionSummary.cards.remainingDays'),
    value: currentData.value.remainingDays,
    subtitle: currentData.value.period,
    icon: 'pi pi-calendar',
    color: '#f59e0b'
  }
]);
</script>

<template>

  <section class="consumption-summary-container">

    <div class="header-section">

      <div>
        <h1>{{ t('consumptionSummary.title') }}</h1>

        <p>
          {{ t('consumptionSummary.description') }}
        </p>
      </div>

      <div class="header-actions">

        <pv-dropdown
            v-model="selectedMonth"
            :options="monthOptions"
            option-label="label"
            option-value="value"
            class="month-dropdown"
            :aria-label="t('consumptionSummary.selectMonth')"
        />

      </div>

    </div>

    <div class="summary-grid">

      <summary-card-component
          v-for="card in summaryCards"
          :key="card.title"
          :card="card"
      />

    </div>

    <div class="charts-grid">

      <consumption-chart-component
          :chart-values="currentData.chartValues"
          :highest-day="currentData.highestDay"
          :highest-value="currentData.highestValue"
      />

      <device-consumption-component
          :devices="currentData.devices"
      />

    </div>

    <div class="bottom-grid">

      <consumption-tip-component
          :tip="currentData.tip"
      />

      <consumption-alert-component
          :alert="currentData.alert"
          :previous-consumption="currentData.previousConsumption"
          :current-consumption="currentData.currentConsumption"
          :difference="currentData.difference"
      />

    </div>

  </section>

</template>

<style scoped>

.consumption-summary-container {
  padding: 2rem;
  padding-bottom: 3rem;
  background: #F7F6F2;
  min-height: 100vh;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 2rem;
  gap: 1rem;
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

.month-dropdown {
  min-width: 220px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;

  margin-bottom: 2rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  margin-bottom: 2rem;
}

.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media screen and (max-width: 992px) {

  .charts-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }

}

@media screen and (max-width: 768px) {

  .consumption-summary-container {
    padding: 1rem;
  }

  .header-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-section h1 {
    font-size: 2rem;
  }

  .header-actions,
  .month-dropdown {
    width: 100%;
  }

  .month-dropdown {
    min-width: 100%;
  }

}

</style>