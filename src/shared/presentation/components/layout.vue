<script setup>
import LanguageSwitcher from './language-switcher.vue';
import FooterContent from './footer-content.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const drawer = ref(false);
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const items = [
  { label: 'option.home', to: '/home' },
  { label: 'option.about', to: '/about' },
  { label: 'option.subscription', to: '/subscription' }
];
</script>

<template>
  <pv-toast />
  <pv-confirm-dialog />

  <div class="header">
    <pv-toolbar class="hera-toolbar">
      <template #start>
        <pv-button class="p-button-text menu-button" icon="pi pi-bars" @click="toggleDrawer" />
        <h3>Hera Platform</h3>
      </template>

      <template #end>
        <div class="navigation-links">
          <pv-button
              v-for="item in items"
              :key="item.label"
              as-child
              severity="contrast"
              variant="text"
              v-slot="slotProps"
          >
            <router-link :to="item.to" :class="slotProps['class']">
              {{ t(item.label) }}
            </router-link>
          </pv-button>
        </div>

        <language-switcher />
      </template>
    </pv-toolbar>

    <pv-drawer v-model:visible="drawer" />
  </div>

  <main class="main-content">
    <router-view />
  </main>

  <div class="footer">
    <footer-content />
  </div>
</template>

<style scoped>
.header {
  width: 100%;
}

.hera-toolbar {
  background: #0d1b2a !important;
  border: none !important;
  border-radius: 0 !important;
  color: #ffffff !important;
  padding: 1rem 2rem;
}

.hera-toolbar h3 {
  color: #ffffff;
  margin: 0;
}

.menu-button {
  color: #ffffff !important;
}

.navigation-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-right: 1rem;
}

.navigation-links a {
  color: #ffffff !important;
  text-decoration: none;
  font-weight: 600;
  padding: 0.6rem 1rem;
  border-radius: 0.6rem;
  transition: all 0.2s ease;
}

.navigation-links a:hover {
  background: rgba(212, 175, 55, 0.12);
  color: #d4af37 !important;
}

.main-content {
  min-height: calc(100vh - 170px);
  background: #f7f6f2;
}

.footer {
  width: 100%;
  background: #0d1b2a;
  color: #ffffff;
}
</style>