<script setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';

import { DeviceApiService } from '../../infrastructure/services/device-api.service';
import { DeviceAssembler } from '../../application/device.assembler';
import useDeviceIotManagementStore from '../../application/device-iot-management.store.js';

const { t } = useI18n();
const toast = useToast();
const deviceService = new DeviceApiService();
const store = useDeviceIotManagementStore();

const devices = ref([]);
const deviceDialog = ref(false);
const saving = ref(false);

const editedDevice = ref({ name: '', type: 0, roomId: null });

const deviceTypeOptions = computed(() => [
  { label: t('rooms.device-type.sensor'),     value: 0 },
  { label: t('rooms.device-type.light'),      value: 1 },
  { label: t('rooms.device-type.thermostat'), value: 2 },
  { label: t('rooms.device-type.plug'),       value: 3 },
  { label: t('rooms.device-type.camera'),     value: 4 },
  { label: t('rooms.device-type.other'),      value: 5 }
]);

const roomOptions = computed(() =>
    store.rooms.map(r => ({ label: r.name, value: r.id }))
);

const isValid = computed(() =>
    editedDevice.value.name.trim().length > 0 && editedDevice.value.roomId != null
);

const loadDevices = async () => {
  try {
    const data = await deviceService.getAll();
    devices.value = DeviceAssembler.toEntitiesFromResponse(data);
  } catch (error) {
    console.error('Error loading devices:', error);
  }
};

const openNew = () => {
  editedDevice.value = { name: '', type: 0, roomId: store.rooms[0]?.id ?? null };
  deviceDialog.value = true;
};

const saveDevice = async () => {
  if (!isValid.value) return;
  saving.value = true;
  try {
    // Backend contract: POST /devices { name, type: number, roomId: number }
    const payload = DeviceAssembler.toResourceFromEntity(editedDevice.value);
    await deviceService.create(payload);
    await loadDevices();
    deviceDialog.value = false;
    toast.add({ severity: 'success', summary: t('rooms.device-registered'), life: 3000 });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('errors.occurred'),
      detail: error?.response?.data?.title
          ?? error?.response?.data?.message
          ?? error?.message,
      life: 5000
    });
  } finally {
    saving.value = false;
  }
};

onMounted(async () => {
  await Promise.all([
    loadDevices(),
    store.fetchRooms().catch(() => {})
  ]);
});
</script>

<template>
  <section class="devices-page">
    <div class="page-header">
      <div>
        <h1>Device Management</h1>
        <p>
          Manage connected smart devices in real time.
        </p>
      </div>

      <Button
          label="Add Device"
          icon="pi pi-plus"
          class="add-button"
          @click="openNew"
          aria-label="Add new device"
      />
    </div>

    <Card class="devices-card">
      <template #content>
        <DataTable
            :value="devices"
            responsive-layout="scroll"
            stripedRows
            paginator
            :rows="5"
            dataKey="id"
        >
          <Column field="name" header="Name" />
          <Column header="Type">
            <template #body="slotProps">
              {{ deviceTypeOptions.find(o => o.value === Number(slotProps.data.type))?.label ?? slotProps.data.type }}
            </template>
          </Column>
          <Column header="Room">
            <template #body="slotProps">
              {{ roomOptions.find(o => o.value === Number(slotProps.data.room))?.label ?? slotProps.data.room }}
            </template>
          </Column>
          <Column field="status" header="Status" />
          <Column
              field="energyConsumption"
              header="Energy (kWh)"
          />
        </DataTable>
      </template>
    </Card>

    <Dialog
        v-model:visible="deviceDialog"
        modal
        header="Device Form"
        :style="{ width: '30rem' }"
    >
      <div class="form-grid">
        <div class="field">
          <label for="device-name">Name</label>

          <InputText
              id="device-name"
              v-model="editedDevice.name"
              fluid
          />
        </div>

        <div class="field">
          <label for="device-type">Type</label>

          <Select
              id="device-type"
              v-model="editedDevice.type"
              :options="deviceTypeOptions"
              option-label="label"
              option-value="value"
              fluid
          />
        </div>

        <div class="field">
          <label for="device-room">Room</label>

          <Select
              id="device-room"
              v-model="editedDevice.roomId"
              :options="roomOptions"
              option-label="label"
              option-value="value"
              :placeholder="roomOptions.length ? undefined : t('rooms.empty')"
              fluid
          />
          <small v-if="!roomOptions.length" class="text-secondary">
            {{ t('rooms.empty') }}
          </small>
        </div>
      </div>

      <template #footer>
        <Button
            label="Cancel"
            severity="secondary"
            text
            @click="deviceDialog = false"
        />

        <Button
            label="Save"
            icon="pi pi-check"
            :loading="saving"
            :disabled="!isValid"
            @click="saveDevice"
        />
      </template>
    </Dialog>
  </section>
</template>

<style scoped>
.devices-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-header h1 {
  color: #f7f6f2;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #b8c5d6;
}

.devices-card {
  border-radius: 20px;
  background: #112240;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  color: #f7f6f2;
}

.add-button {
  background: #d4af37;
  border: none;
  color: #0d1b2a;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .add-button {
    width: 100%;
  }
}
</style>
