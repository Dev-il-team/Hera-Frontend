<script setup>
import { useI18n } from 'vue-i18n';
import { onMounted, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import useAutomationStore from '../../application/automation.store.js';
import { formatTrigger } from '../../domain/model/routine.entity.js';

const { t } = useI18n();
const router = useRouter();
const store = useAutomationStore();
const { routines, routinesLoaded, errors } = toRefs(store);
const { fetchRoutines } = store;

const navigateToNew = () => router.push({ name: 'routine-new' });

onMounted(() => {
  if (!routinesLoaded.value) fetchRoutines();
});

const triggerText = (routine) => formatTrigger(routine.trigger, t);
const statusSeverity = (status) => status === 'active' ? 'success' : 'secondary';
const formatNextExecution = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString();
};
</script>

<template>
  <div class="p-4">
    <div class="flex justify-content-between align-items-start mb-3">
      <div>
        <h1 class="mb-1">{{ t('routines.title') }}</h1>
        <p class="text-secondary m-0">{{ t('routines.subtitle') }}</p>
      </div>
      <pv-button :label="t('routines.new')" icon="pi pi-plus" @click="navigateToNew" />
    </div>

    <pv-card class="mb-4 banner">
      <template #content>
        <div class="flex align-items-center">
          <i class="pi pi-bolt text-primary mr-3" style="font-size: 1.5rem"></i>
          <div>
            <strong>{{ t('routines.automate-title') }}</strong>
            <div class="text-sm text-secondary">{{ t('routines.automate-subtitle') }}</div>
          </div>
        </div>
      </template>
    </pv-card>

    <h2>{{ t('routines.my-routines') }}</h2>

    <div class="routine-table-wrapper">
      <pv-data-table
          :value="routines"
          :loading="!routinesLoaded"
          striped-rows
          table-style="min-width: 50rem"
      >
      <pv-column field="name" :header="t('routines.col.name')" sortable />
      <pv-column field="description" :header="t('routines.col.description')" />
      <pv-column :header="t('routines.col.trigger')">
        <template #body="{ data }">{{ triggerText(data) }}</template>
      </pv-column>
      <pv-column :header="t('routines.col.action')">
        <template #body="{ data }">
          <span class="text-sm">{{ t(`routines.command.${data.action.command}`) }}</span>
        </template>
      </pv-column>
      <pv-column :header="t('routines.col.status')">
        <template #body="{ data }">
          <pv-tag :value="t(`routines.status.${data.status}`)" :severity="statusSeverity(data.status)" />
        </template>
      </pv-column>
      <pv-column :header="t('routines.col.next-execution')">
        <template #body="{ data }">{{ formatNextExecution(data.nextExecution) }}</template>
      </pv-column>
      <pv-column :header="t('routines.col.actions')">
        <template #body>
          <pv-button icon="pi pi-pencil" text rounded disabled />
          <pv-button icon="pi pi-trash" text rounded severity="danger" disabled />
        </template>
      </pv-column>
    </pv-data-table>


    </div>

    <pv-card class="mt-4 banner">
      <template #content>
        <div class="flex align-items-center">
          <i class="pi pi-check-circle text-primary mr-3" style="font-size: 1.5rem"></i>
          <div>
            <strong>{{ t('routines.auto-run-title') }}</strong>
            <div class="text-sm text-secondary">{{ t('routines.auto-run-subtitle') }}</div>
          </div>
        </div>
      </template>
    </pv-card>

    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
    </div>
  </div>
</template>

<style scoped>
.banner {
  border-left: 4px solid var(--primary-color);
}

.routine-table-wrapper {
  overflow-x: auto;
}
</style>
