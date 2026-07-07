<script setup>
import LanguageSwitcher from './language-switcher.vue';
import FooterContent from './footer-content.vue';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useIamStore from '../../../iam/application/iam.store.js';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const iam = useIamStore();

const isPublicView = computed(() => route.meta['public'] === true);

const items = [
    { label: 'nav.consumption-summary', to: { name: 'consumption-summary' } },
    { label: 'nav.rooms',               to: { name: 'rooms' } },
    { label: 'nav.notifications',       to: { name: 'notifications' } },
    { label: 'nav.routines',            to: { name: 'routines' } },
    { label: 'nav.subscription',        to: { name: 'subscription' } },
    { label: 'nav.profile',             to: { name: 'profile' } }
];

const onSignOut = () => {
  iam.signOut();
  router.push({ name: 'sign-in' });
};
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <template v-if="isPublicView">
    <router-view/>
  </template>
  <template v-else>
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
    <span v-if="iam.username" class="session-user">
      <i class="pi pi-user mr-1"></i>{{ iam.username }}
    </span>
    <pv-button
        icon="pi pi-sign-out"
        text
        rounded
        class="sign-out-btn"
        :aria-label="t('auth.sign-out')"
        v-tooltip.bottom="t('auth.sign-out')"
        @click="onSignOut"
    />
  </header>
  <main class="main-content">
    <router-view/>
  </main>
  <footer class="footer">
    <footer-content/>
  </footer>
  </template>
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

.session-user {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a1f2b;
  white-space: nowrap;
}
.sign-out-btn { color: #1a1f2b !important; }

.main-content {
  min-height: calc(100vh - 200px);
}

.footer {
  padding: 10px;
}
</style>
