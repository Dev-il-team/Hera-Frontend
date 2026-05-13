<script setup>

defineProps({
  card: {
    type: Object,
    required: true
  }
})

</script>

<template>

  <pv-card class="summary-card">

    <template #content>

      <div class="card-content">

        <div
            class="icon-container"
            :style="{ backgroundColor: `${card.color}15` }"
        >
          <i
              :class="card.icon"
              :style="{ color: card.color }"
              class="card-icon"
          ></i>
        </div>

        <div class="card-info">

          <h3>
            {{ card.title }}
          </h3>

          <h2>
            {{ card.value }}
          </h2>

          <p>
            {{ card.subtitle }}
          </p>

        </div>

      </div>

    </template>

  </pv-card>

</template>

<style scoped>

.summary-card {
  border-radius: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
}

.card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-container {
  width: 72px;
  height: 72px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 20px;
}

.card-icon {
  font-size: 2rem;
}

.card-info h3 {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.card-info h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #0D1B2A;
  margin-bottom: 0.4rem;
}

.card-info p {
  color: #16a34a;
  font-size: 0.95rem;
  font-weight: 500;
}

</style>