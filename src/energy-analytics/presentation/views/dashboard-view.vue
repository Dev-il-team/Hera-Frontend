<script setup>
const devices = [
  { name: 'Refrigerador', icon: 'pi pi-mobile', consumption: 18.7, percentage: 23.8, color: '#2f80ed' },
  { name: 'Aire acondicionado', icon: 'pi pi-desktop', consumption: 16.3, percentage: 20.7, color: '#27ae60' },
  { name: 'Televisor', icon: 'pi pi-tv', consumption: 11.8, percentage: 15.0, color: '#f2c94c' },
  { name: 'Lavadora', icon: 'pi pi-box', consumption: 7.6, percentage: 9.7, color: '#9b51e0' },
  { name: 'Iluminación', icon: 'pi pi-lightbulb', consumption: 6.4, percentage: 8.1, color: '#f97316' },
  { name: 'Microondas', icon: 'pi pi-tablet', consumption: 3.5, percentage: 4.5, color: '#56ccf2' },
  { name: 'Computadora', icon: 'pi pi-desktop', consumption: 2.9, percentage: 3.7, color: '#eb5757' },
  { name: 'Otros', icon: 'pi pi-ellipsis-h', consumption: 11.4, percentage: 14.5, color: '#9ca3af' }
]

const summaryCards = [
  {
    title: 'dashboard.lightsOn',
    subtitle: 'dashboard.currentlyActive',
    value: 4,
    icon: 'pi pi-lightbulb',
    className: 'lights'
  },
  {
    title: 'dashboard.plugsUsed',
    subtitle: 'dashboard.currentlyActive',
    value: 10,
    icon: 'pi pi-bolt',
    className: 'plugs'
  }
]
</script>

<template>
  <main class="dashboard-view" aria-labelledby="dashboard-title">
    <section class="dashboard-hero">
      <div>
        <p class="hero-greeting">{{ $t('dashboard.greeting') }}</p>
        <h1 id="dashboard-title">{{ $t('dashboard.title') }}</h1>
        <p class="hero-description">
          {{ $t('dashboard.description') }}
        </p>
      </div>

      <aside class="update-card" aria-label="Última actualización del dashboard">
        <i class="pi pi-clock" aria-hidden="true"></i>
        <div>
          <span>{{ $t('dashboard.lastUpdate') }}</span>
          <strong>{{ $t('dashboard.todayTime') }}</strong>
        </div>
        <span class="status-dot" aria-label="Estado conectado"></span>
      </aside>
    </section>

    <section class="consumption-card" aria-labelledby="consumption-title">
      <div class="card-header">
        <h2 id="consumption-title">
          {{ $t('dashboard.deviceConsumption') }}
        </h2>
        <i class="pi pi-info-circle" aria-hidden="true"></i>
      </div>

      <div class="consumption-content">
        <div class="donut-chart" aria-label="Consumo total de 78.6 kWh">
          <div class="donut-center">
            <strong>78.6</strong>
            <span>kWh</span>
            <small>Total</small>
          </div>
        </div>

        <div class="device-table" role="table" aria-label="Tabla de consumo por dispositivo">
          <div class="table-row table-head" role="row">
            <span role="columnheader">{{ $t('dashboard.device') }}</span>
            <span role="columnheader">{{ $t('dashboard.consumption') }}</span>
            <span role="columnheader">{{ $t('dashboard.percentage') }}</span>
          </div>

          <div
              v-for="device in devices"
              :key="device.name"
              class="table-row"
              role="row"
          >
            <span class="device-name" role="cell">
              <span class="color-dot" :style="{ backgroundColor: device.color }"></span>
              <i :class="device.icon" aria-hidden="true"></i>
              {{ device.name }}
            </span>
            <span role="cell">{{ device.consumption }}</span>
            <span role="cell">{{ device.percentage }}%</span>
          </div>

          <button class="devices-link" type="button">
            {{ $t('dashboard.viewAllDevices') }}
            <i class="pi pi-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </section>

    <section class="summary-grid" aria-label="Tarjetas resumen del hogar">
      <article
          v-for="card in summaryCards"
          :key="card.title"
          class="summary-card"
          :class="card.className"
      >
        <div class="summary-icon">
          <i :class="card.icon" aria-hidden="true"></i>
        </div>

        <div class="summary-info">
          <h3>{{ $t(card.title) }}</h3>
          <p>{{ $t(card.subtitle) }}</p>
        </div>

        <strong class="summary-value">{{ card.value }}</strong>
      </article>
    </section>
  </main>
</template>

<style scoped>
.dashboard-view {
  min-height: 100vh;
  padding: 2rem;
  background: #f7f6f2;
  color: #0D1B2A;
}

.dashboard-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
}

.hero-greeting {
  margin: 0 0 0.5rem;
  font-size: 1.15rem;
  color: #1f2937;
}

.dashboard-hero h1 {
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  color: #071527;
}

.hero-description {
  margin: 0.75rem 0 0;
  font-size: 1.15rem;
  color: #374151;
}

.update-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 260px;
  padding: 1.25rem 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 1.25rem;
  background: linear-gradient(
      135deg,
      rgba(255,255,255,0.96),
      rgba(247,246,242,0.95)
  );
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.08);
}

.update-card i {
  font-size: 1.5rem;
}

.update-card span {
  display: block;
  font-size: 0.85rem;
  color: #6b7280;
}

.update-card strong {
  display: block;
  margin-top: 0.2rem;
  color: #071527;
}

.status-dot {
  width: 0.7rem;
  height: 0.7rem;
  margin-left: auto;
  border-radius: 50%;
  background: #2ecc71;
}

.consumption-card,
.summary-card {
  border: 1px solid #e5e7eb;
  border-radius: 1.5rem;
  background: linear-gradient(
      145deg,
      #ffffff,
      #f8fafc
  );
  box-shadow:
      0 10px 30px rgba(13, 27, 42, 0.08),
      0 2px 10px rgba(13, 27, 42, 0.06);
}

.consumption-card {
  padding: 2rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-header h2 {
  margin: 0;
  font-size: 1.4rem;
}

.card-header i {
  color: #9ca3af;
}

.consumption-content {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 3rem;
  align-items: center;
  margin-top: 1rem;
}

.donut-chart {
  position: relative;
  width: 300px;
  height: 300px;
  margin: auto;
  border-radius: 50%;
  background: conic-gradient(
      #2f80ed 0 23.8%,
      #27ae60 23.8% 44.5%,
      #f2c94c 44.5% 59.5%,
      #9b51e0 59.5% 69.2%,
      #f97316 69.2% 77.3%,
      #56ccf2 77.3% 81.8%,
      #eb5757 81.8% 85.5%,
      #9ca3af 85.5% 100%
  );
}

.donut-chart::after {
  content: '';
  position: absolute;
  inset: 74px;
  border-radius: 50%;
  background: #ffffff;
}

.donut-center {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.donut-center strong {
  font-size: 2.6rem;
  line-height: 1;
  color: #0D1B2A;
}

.donut-center span {
  margin-top: 0.3rem;
  font-size: 1.4rem;
  font-weight: 700;
}

.donut-center small {
  margin-top: 0.25rem;
  color: #6b7280;
}

.device-table {
  width: 100%;
}

.table-row {
  display: grid;
  grid-template-columns: 1.5fr 0.7fr 0.7fr;
  gap: 1rem;
  align-items: center;
  padding: 0.72rem 0;
  color: #111827;
}

.table-head {
  font-size: 0.9rem;
  color: #6b7280;
}

.device-name {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.color-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
}

.device-name i {
  color: #6b7280;
}

.devices-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 1rem 0 0 auto;
  border: none;
  background: transparent;
  color: #D4AF37;
  transition: all 0.3s ease;
  font-weight: 700;
  cursor: pointer;
}

.devices-link:hover {
  transform: translateX(4px);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.summary-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
}

.summary-icon {
  display: grid;
  place-items: center;
  width: 7rem;
  height: 7rem;
  border-radius: 1rem;
  font-size: 3rem;
}

.summary-card.lights .summary-icon {
  background: rgba(212, 175, 55, 0.12);
  color: #d6aa21;
}

.summary-card.plugs .summary-icon {
  background: rgba(139, 92, 246, 0.12);
  color: #7b46d9;
}

.summary-info h3 {
  max-width: 330px;
  margin: 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  font-size: 1.6rem;
  line-height: 1.25;
}

.summary-info p {
  margin: 1rem 0 0;
  color: #6b7280;
}

.summary-value {
  font-size: 4rem;
  font-weight: 800;
}

.summary-card.lights .summary-value {
  color: #d6aa21;
}

.summary-card.plugs .summary-value {
  color: #7b46d9;
}

@media (max-width: 960px) {
  .dashboard-hero {
    align-items: flex-start;
    flex-direction: column;
  }

  .update-card {
    width: 100%;
  }

  .consumption-content {
    grid-template-columns: 1fr;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .dashboard-view {
    padding: 1rem;
  }

  .consumption-card {
    padding: 1.25rem;
  }

  .donut-chart {
    width: 230px;
    height: 230px;
  }

  .donut-chart::after {
    inset: 58px;
  }

  .table-row {
    grid-template-columns: 1fr;
    gap: 0.35rem;
    padding: 1rem 0;
    border-bottom: 1px solid #f1f5f9;
  }

  .table-head {
    display: none;
  }

  .summary-card {
    grid-template-columns: 1fr;
  }

  .summary-value {
    font-size: 3.5rem;
  }

  .summary-card,
  .consumption-card,
  .update-card {
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
  }

  .summary-card:hover,
  .consumption-card:hover,
  .update-card:hover {
    transform: translateY(-4px);

    box-shadow:
        0 18px 40px rgba(13, 27, 42, 0.12),
        0 6px 18px rgba(13, 27, 42, 0.08);
  }
}
</style>
