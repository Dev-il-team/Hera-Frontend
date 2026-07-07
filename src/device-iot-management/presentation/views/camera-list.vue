<script setup>
import { useI18n } from 'vue-i18n';
import { computed, onMounted, ref, toRefs } from 'vue';
import { useToast } from 'primevue/usetoast';
import useDeviceIotManagementStore from '../../application/device-iot-management.store.js';
import CameraCard from '../components/camera-card.vue';

const { t } = useI18n();
const toast = useToast();
const store = useDeviceIotManagementStore();
const { cameras, camerasLoaded, errors, allCamerasOnline } = toRefs(store);
const { fetchCameras } = store;

const showRegisterDialog = ref(false);
const saving = ref(false);
const form = ref({ name: '', location: '', streamUrl: '' });

const isValid = computed(() =>
    form.value.name.trim() && form.value.location.trim() && form.value.streamUrl.trim()
);

onMounted(() => {
  if (!camerasLoaded.value) fetchCameras();
});

const onRegister = async () => {
  if (!isValid.value) return;
  saving.value = true;
  try {
    await store.registerCamera({ ...form.value });
    showRegisterDialog.value = false;
    form.value = { name: '', location: '', streamUrl: '' };
    toast.add({ severity: 'success', summary: t('cameras.registered'), life: 3000 });
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
        <h1>{{ t('cameras.device-title') }}</h1>
        <p class="text-secondary">{{ t('cameras.device-subtitle') }}</p>
      </div>
      <pv-button
          :label="t('cameras.register')"
          icon="pi pi-plus"
          @click="showRegisterDialog = true"
      />
    </div>

    <h2 class="mt-4">{{ t('cameras.my-cameras') }}</h2>

    <div v-if="!camerasLoaded" class="p-4 text-center">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>

    <div v-else class="grid">
      <div v-for="camera in cameras" :key="camera.id" class="col-12 md:col-6 lg:col-4">
        <camera-card :camera="camera" />
      </div>
    </div>

    <pv-card v-if="camerasLoaded && allCamerasOnline" class="mt-4 status-banner">
      <template #content>
        <div class="flex align-items-center">
          <i class="pi pi-shield text-primary mr-3" style="font-size: 1.5rem"></i>
          <div>
            <strong>{{ t('cameras.all-ok-title') }}</strong>
            <div class="text-sm text-secondary">{{ t('cameras.all-ok-subtitle') }}</div>
          </div>
        </div>
      </template>
    </pv-card>

    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
    </div>

    <!-- Register camera -->
    <pv-dialog
        v-model:visible="showRegisterDialog"
        :header="t('cameras.register')"
        modal
        :style="{ width: '28rem', maxWidth: '95vw' }"
    >
      <form class="flex flex-column gap-4 pt-2" @submit.prevent="onRegister">
        <pv-float-label variant="on">
          <pv-input-text id="cam-name" v-model="form.name" class="w-full" required/>
          <label for="cam-name">{{ t('cameras.name') }}</label>
        </pv-float-label>

        <pv-float-label variant="on">
          <pv-input-text id="cam-location" v-model="form.location" class="w-full" required/>
          <label for="cam-location">{{ t('cameras.location') }}</label>
        </pv-float-label>

        <pv-float-label variant="on">
          <pv-input-text id="cam-stream" v-model="form.streamUrl" class="w-full" required/>
          <label for="cam-stream">{{ t('cameras.stream-url') }}</label>
        </pv-float-label>

        <div class="flex justify-content-end gap-2">
          <pv-button
              type="button"
              :label="t('actions.cancel')"
              severity="secondary"
              text
              @click="showRegisterDialog = false"
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
.status-banner {
  border-left: 4px solid var(--primary-color);
}
</style>
