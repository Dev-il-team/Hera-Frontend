<script setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import useEnergyAnalyticsStore from '../../application/energy-analytics.store.js';

const { t, n } = useI18n();
const toast = useToast();
const store = useEnergyAnalyticsStore();

const loading = ref(true);
const loadError = ref(null);

const showRecordDialog = ref(false);
const saving = ref(false);
const emptyForm = () => ({ deviceName: '', period: '', kilowattHours: 0, cost: 0 });
const form = ref(emptyForm());

const isValid = computed(() =>
    form.value.deviceName.trim() &&
    form.value.period.trim() &&
    form.value.kilowattHours >= 0 &&
    form.value.cost >= 0
);

onMounted(async () => {
  try {
    await store.fetchReports();
  } catch (e) {
    loadError.value = e?.response?.data?.message ?? e?.message;
  } finally {
    loading.value = false;
  }
});

const onRecord = async () => {
  if (!isValid.value) return;
  saving.value = true;
  try {
    await store.recordConsumption({ ...form.value });
    showRecordDialog.value = false;
    form.value = emptyForm();
    toast.add({ severity: 'success', summary: t('reports.recorded'), life: 3000 });
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: t('errors.occurred'),
      detail: e?.response?.data?.message ?? e?.message,
      life: 5000
    });
  } finally {
    saving.value = false;
  }
};
</script>

<template>
  <div class="p-4">
    <div class="flex align-items-center justify-content-between flex-wrap gap-2">
      <div>
        <h1 class="mb-1">{{ t('reports.title') }}</h1>
        <p class="text-secondary mt-0">{{ t('reports.subtitle') }}</p>
      </div>
      <pv-button
          :label="t('reports.record')"
          icon="pi pi-plus"
          @click="showRecordDialog = true"
      />
    </div>

    <div v-if="loading" class="text-secondary">{{ t('reports.loading') }}</div>
    <div v-else-if="loadError" class="text-red-500">{{ loadError }}</div>

    <template v-else>
      <div class="grid mt-2">
        <div class="col-12 md:col-6 lg:col-4">
          <pv-card class="summary-card">
            <template #content>
              <div class="flex align-items-center gap-3">
                <i class="pi pi-bolt text-primary" style="font-size: 1.8rem"></i>
                <div>
                  <div class="text-sm text-secondary">{{ t('reports.total-kwh') }}</div>
                  <strong class="text-xl">{{ n(store.totalKilowattHours) }} kWh</strong>
                </div>
              </div>
            </template>
          </pv-card>
        </div>
        <div class="col-12 md:col-6 lg:col-4">
          <pv-card class="summary-card">
            <template #content>
              <div class="flex align-items-center gap-3">
                <i class="pi pi-wallet text-primary" style="font-size: 1.8rem"></i>
                <div>
                  <div class="text-sm text-secondary">{{ t('reports.total-cost') }}</div>
                  <strong class="text-xl">{{ n(store.totalCost) }}</strong>
                </div>
              </div>
            </template>
          </pv-card>
        </div>
      </div>

      <pv-data-table :value="store.reports" striped-rows paginator :rows="10" class="mt-3">
        <pv-column field="id" header="ID" sortable/>
        <pv-column field="deviceName" :header="t('reports.device-name')" sortable/>
        <pv-column field="period" :header="t('reports.period')" sortable/>
        <pv-column field="kilowattHours" :header="t('reports.kwh')" sortable/>
        <pv-column field="cost" :header="t('reports.cost')" sortable/>
      </pv-data-table>
      <p v-if="store.reports.length === 0" class="text-secondary">
        {{ t('reports.empty') }}
      </p>
    </template>

    <!-- Record consumption -->
    <pv-dialog
        v-model:visible="showRecordDialog"
        :header="t('reports.record')"
        modal
        :style="{ width: '28rem', maxWidth: '95vw' }"
    >
      <form class="flex flex-column gap-4 pt-2" @submit.prevent="onRecord">
        <pv-float-label variant="on">
          <pv-input-text id="rep-device" v-model="form.deviceName" class="w-full" required/>
          <label for="rep-device">{{ t('reports.device-name') }}</label>
        </pv-float-label>

        <pv-float-label variant="on">
          <pv-input-text
              id="rep-period"
              v-model="form.period"
              class="w-full"
              :placeholder="t('reports.period-placeholder')"
              required
          />
          <label for="rep-period">{{ t('reports.period') }}</label>
        </pv-float-label>

        <pv-float-label variant="on">
          <pv-input-number
              id="rep-kwh"
              v-model="form.kilowattHours"
              class="w-full"
              :min="0"
              :max-fraction-digits="2"
          />
          <label for="rep-kwh">{{ t('reports.kwh') }}</label>
        </pv-float-label>

        <pv-float-label variant="on">
          <pv-input-number
              id="rep-cost"
              v-model="form.cost"
              class="w-full"
              :min="0"
              :max-fraction-digits="2"
          />
          <label for="rep-cost">{{ t('reports.cost') }}</label>
        </pv-float-label>

        <div class="flex justify-content-end gap-2">
          <pv-button
              type="button"
              :label="t('actions.cancel')"
              severity="secondary"
              text
              @click="showRecordDialog = false"
          />
          <pv-button
              type="submit"
              :label="t('actions.save')"
              icon="pi pi-check"
              :loading="saving"
              :disabled="!isValid"
          />
        </div>
      </form>
    </pv-dialog>
  </div>
</template>

<style scoped>
.summary-card { border-left: 4px solid #d4a017; }
</style>
