<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const kinds = [
  { name: 'cameras', icon: 'pi pi-video', to: { name: 'cameras' } }
];
</script>

<template>
  <div class="p-4">
    <h1>{{ t('devices.title') }}</h1>
    <p class="text-secondary">{{ t('devices.subtitle') }}</p>

    <div class="grid mt-3">
      <div v-for="kind in kinds" :key="kind.name" class="col-12 md:col-6 lg:col-4">
        <router-link :to="kind.to" class="kind-link">
          <pv-card class="kind-card">
            <template #content>
              <div class="flex align-items-center">
                <i :class="kind.icon" class="text-primary mr-3" style="font-size: 2rem"></i>
                <div>
                  <strong>{{ t(`devices.kind.${kind.name}`) }}</strong>
                  <div class="text-sm text-secondary">{{ t(`devices.kind-${kind.name}-subtitle`) }}</div>
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
.kind-link { text-decoration: none; color: inherit; }
.kind-card { cursor: pointer; transition: transform 0.1s ease; }
.kind-card:hover { transform: translateY(-2px); }
</style>
