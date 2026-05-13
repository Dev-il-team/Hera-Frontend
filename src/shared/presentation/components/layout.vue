<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import LanguageSwitcher from './language-switcher.vue'
import FooterContent from './footer-content.vue'
import HeraSidebar from '@/shared/presentation/components/sidebar/hera-sidebar.component.vue'

const { t } = useI18n()

const drawer = ref(false)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const items = [
  {
    label: 'option.home',
    to: '/home'
  },
  {
    label: 'option.about',
    to: '/about'
  },
  {
    label: 'Subscription',
    to: '/subscription'
  }
]
</script>

<template>
  <pv-toast />
  <pv-confirm-dialog />

  <div class="header">
    <pv-toolbar class="hera-toolbar">
      <template #start>
        <pv-button
            class="p-button-text menu-button"
            icon="pi pi-bars"
            aria-label="Abrir menú"
            @click="toggleDrawer"
        />

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
            <router-link
                :to="item.to"
                :class="slotProps['class']"
            >
              {{ t(item.label) }}
            </router-link>
          </pv-button>
        </div>

        <language-switcher />
      </template>
    </pv-toolbar>

    <pv-drawer v-model:visible="drawer" />
  </div>

  <div class="layout-body">
    <HeraSidebar />

    <main
        class="main-content"
        aria-label="Contenido principal"
    >
      <router-view />
    </main>
  </div>

  <div class="footer">
    <footer-content />
  </div>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.hera-toolbar {
  background: #0D1B2A;
  border: none;
  border-radius: 0;
  padding: 0.75rem 1.5rem;
  color: #F7F6F2;
  box-shadow: 0 4px 18px rgba(13, 27, 42, 0.15);
}

.hera-toolbar h3 {
  color: #D4AF37;
  margin-left: 1rem;
  font-weight: 700;
}

.navigation-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.menu-button {
  color: #D4AF37 !important;
}

.layout-body {
  display: flex;
  min-height: calc(100vh - 80px);
  background: #F7F6F2;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-x: hidden;
}

.footer {
  width: 100%;
}

@media (max-width: 768px) {
  .layout-body {
    flex-direction: column;
  }

  .main-content {
    padding: 1rem;
  }

  .navigation-links {
    display: none;
  }
}
</style>