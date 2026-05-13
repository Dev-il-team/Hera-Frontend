<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <footer class="footer-content" aria-label="Información del sitio">
    <p>Copyright &copy; 2025. Hera Platform</p>

    <p>
      {{ t('authoring-phrase.intro') }} <i class="pi pi-heart" aria-hidden="true" />
      {{ t('authoring-phrase.use') }}
      <a href="https://primevue.org/" target="_blank" rel="noopener noreferrer">PrimeVue</a>
      {{ t('authoring-phrase.author', { brand: 'Hera' }) }}
    </p>
  </footer>
</template>

<style scoped>
.footer-content {
  background: #0d1b2a;
  color: #ffffff;
  padding: 1.5rem 2rem;
}

.footer-content p {
  margin: 0 0 0.75rem;
}

.footer-content p:last-child {
  margin-bottom: 0;
}

.footer-content a {
  color: #d4af37;
  font-weight: 700;
}
</style>