<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const shortcuts = [
  { name: 'devices',       icon: 'pi pi-microchip', to: { name: 'devices' } },
  { name: 'routines',      icon: 'pi pi-bolt',      to: { name: 'routines' } },
  { name: 'notifications', icon: 'pi pi-bell',      to: { name: 'notifications' } }
];
</script>

<template>
  <div class="m-4">
    <h1>{{ t('home.title') }}</h1>
    <p class="text-secondary">{{ t('home.content') }}</p>

    <div class="grid mt-4">
      <div v-for="s in shortcuts" :key="s.name" class="col-12 md:col-4">
        <router-link :to="s.to" class="shortcut-link">
          <pv-card class="shortcut-card">
            <template #content>
              <div class="flex align-items-center">
                <i :class="s.icon" class="text-primary mr-3" style="font-size: 2rem"></i>
                <div>
                  <strong>{{ t(`home.shortcut.${s.name}`) }}</strong>
                </div>
                <i class="pi pi-chevron-right ml-auto text-secondary"></i>
              </div>
            </template>
          </pv-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shortcut-link { text-decoration: none; color: inherit; }
.shortcut-card { cursor: pointer; transition: transform 0.1s ease; }
.shortcut-card:hover { transform: translateY(-2px); }
</style>
