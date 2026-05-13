<script setup>
import LanguageSwitcher from './language-switcher.vue';
import FooterContent from './footer-content.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// All five nav items render to match the mockup. Only the in-scope routes are
// wired; the rest land on Home for now (see CONTEXT-MAP.md retreat plan).
const items = [
    { label: 'nav.consumption-summary', to: '/home' },
    { label: 'nav.notifications',       to: { name: 'notifications' } },
    { label: 'nav.routines',            to: { name: 'routines' } },
    { label: 'nav.subscription',        to: '/home' },
    { label: 'nav.profile',             to: '/home' }
];
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <header class="hera-header">
    <router-link :to="{ name: 'home' }" class="brand" :aria-label="t('nav.home')">
      <i class="pi pi-home brand-icon"></i>
    </router-link>
    <nav class="nav-items">
      <router-link
          v-for="item in items"
          :key="item.label"
          :to="item.to"
          class="nav-link"
          active-class="nav-link-active"
      >
        {{ t(item.label) }}
      </router-link>
    </nav>
    <language-switcher class="lang-switch"/>
  </header>
  <main class="main-content">
    <router-view/>
  </main>
  <footer class="footer">
    <footer-content/>
  </footer>
</template>

<style scoped>
.hera-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background: #d4a017;
  color: #1a1f2b;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1a1f2b;
  color: #d4a017;
  text-decoration: none;
}
.brand-icon { font-size: 1.2rem; }

.nav-items {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.nav-link {
  color: #1a1f2b;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.15s ease;
}
.nav-link:hover { background: rgba(26, 31, 43, 0.12); }
.nav-link-active {
  background: #1a1f2b;
  color: #d4a017;
}

.lang-switch { margin-left: auto; }

.main-content {
  min-height: calc(100vh - 200px);
}

.footer {
  padding: 10px;
}
</style>
