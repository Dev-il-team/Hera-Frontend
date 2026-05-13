<script setup>
import { onMounted, ref } from 'vue';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

import { DeviceApiService } from '../../infrastructure/services/device-api.service';
import { DeviceAssembler } from '../../application/device.assembler';

const deviceService = new DeviceApiService();

const devices = ref([]);

const deviceDialog = ref(false);

const editedDevice = ref({
  id: null,
  name: '',
  type: '',
  room: '',
  status: '',
  energyConsumption: 0
});

const loadDevices = async () => {
  try {
    const response = await deviceService.getAll();

    devices.value =
        DeviceAssembler.toEntitiesFromResponse(response);
  } catch (error) {
    console.error('Error loading devices:', error);
  }
};

const openNew = () => {
  editedDevice.value = {
    id: null,
    name: '',
    type: '',
    room: '',
    status: '',
    energyConsumption: 0
  };

  deviceDialog.value = true;
};

const editDevice = (device) => {
  editedDevice.value = { ...device };
  deviceDialog.value = true;
};

const saveDevice = async () => {
  try {
    const payload =
        DeviceAssembler.toResourceFromEntity(
            editedDevice.value
        );

    if (editedDevice.value.id) {
      await deviceService.update(
          editedDevice.value.id,
          payload
      );
    } else {
      await deviceService.create(payload);
    }

    await loadDevices();

    deviceDialog.value = false;
  } catch (error) {
    console.error('Error saving device:', error);
  }
};

const deleteDevice = async (id) => {
  try {
    await deviceService.delete(id);

    await loadDevices();
  } catch (error) {
    console.error('Error deleting device:', error);
  }
};

onMounted(async () => {
  await loadDevices();
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
          <Column field="type" header="Type" />
          <Column field="room" header="Room" />
          <Column field="status" header="Status" />
          <Column
              field="energyConsumption"
              header="Energy (kWh)"
          />

          <Column header="Actions">
            <template #body="slotProps">
              <div class="actions">
                <Button
                    icon="pi pi-pencil"
                    severity="warning"
                    rounded
                    text
                    aria-label="Edit device"
                    @click="editDevice(slotProps.data)"
                />

                <Button
                    icon="pi pi-trash"
                    severity="danger"
                    rounded
                    text
                    aria-label="Delete device"
                    @click="deleteDevice(slotProps.data.id)"
                />
              </div>
            </template>
          </Column>
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
          <label>Name</label>

          <InputText
              v-model="editedDevice.name"
              fluid
          />
        </div>

        <div class="field">
          <label>Type</label>

          <InputText
              v-model="editedDevice.type"
              fluid
          />
        </div>

        <div class="field">
          <label>Room</label>

          <InputText
              v-model="editedDevice.room"
              fluid
          />
        </div>

        <div class="field">
          <label>Status</label>

          <InputText
              v-model="editedDevice.status"
              fluid
          />
        </div>

        <div class="field">
          <label>Energy Consumption</label>

          <InputText
              v-model="editedDevice.energyConsumption"
              fluid
          />
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

.actions {
  display: flex;
  gap: 0.5rem;
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