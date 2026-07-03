<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <footer class="footer-content" aria-label="Site information">
    <div class="footer-top">
      <div class="footer-brand">
        <h3>Hera Platform</h3>

        <p>
          Smart home management, automation and energy monitoring.
        </p>
      </div>

      <div class="footer-links">
        <span>{{ t('nav.home') }}</span>
        <span>{{ t('nav.consumption-summary') }}</span>
        <span>{{ t('nav.notifications') }}</span>
        <span>{{ t('nav.routines') }}</span>
      </div>
    </div>

    <div class="footer-divider"></div>

    <div class="footer-bottom">
      <p>© 2025 Hera Platform. All rights reserved.</p>

      <p>
        {{ t('authoring-phrase.intro') }}
        <i class="pi pi-heart" aria-hidden="true" />
        {{ t('authoring-phrase.use') }}
        <a
            href="https://primevue.org/"
            target="_blank"
            rel="noopener noreferrer"
        >
          PrimeVue
        </a>
        {{ t('authoring-phrase.author', { brand: 'Hera' }) }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer-content {
  background: #0d1b2a;
  color: #ffffff;
  padding: 2rem;
  margin-top: auto;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-brand h3 {
  margin: 0 0 0.5rem;
  color: #d4af37;
}

.footer-brand p {
  margin: 0;
  opacity: 0.85;
  max-width: 400px;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.95rem;
  opacity: 0.9;
}

.footer-divider {
  height: 1px;
  background: rgba(255,255,255,0.15);
  margin: 1.25rem 0;
}

.footer-bottom p {
  margin: 0 0 0.5rem;
}

.footer-bottom p:last-child {
  margin-bottom: 0;
}

.footer-content a {
  color: #d4af37;
  font-weight: 700;
  text-decoration: none;
}

.footer-content a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
  }

  .footer-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>