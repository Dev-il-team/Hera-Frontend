<script setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import useDeviceIotManagementStore from '../../application/device-iot-management.store.js';

const { t } = useI18n();
const toast = useToast();
const store = useDeviceIotManagementStore();

const loading = ref(true);
const loadError = ref(null);
const selectedRoom = ref(null);
const loadingDevices = ref(false);

const showRoomDialog = ref(false);
const roomForm = ref({ name: '' });
const savingRoom = ref(false);

const showDeviceDialog = ref(false);
const deviceForm = ref({ name: '', type: 0, roomId: null });
const savingDevice = ref(false);

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

const selectedRoomDevices = computed(() =>
    selectedRoom.value ? (store.devicesByRoom[selectedRoom.value.id] ?? []) : []
);

onMounted(async () => {
  try {
    await store.fetchRooms();
  } catch (e) {
    loadError.value = e?.response?.data?.message ?? e?.message;
  } finally {
    loading.value = false;
  }
});

const onSelectRoom = async (room) => {
  selectedRoom.value = room;
  loadingDevices.value = true;
  try {
    await store.fetchDevicesByRoom(room.id);
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: t('errors.occurred'),
      detail: e?.response?.data?.message ?? e?.message,
      life: 5000
    });
  } finally {
    loadingDevices.value = false;
  }
};

const onCreateRoom = async () => {
  if (!roomForm.value.name.trim()) return;
  savingRoom.value = true;
  try {
    await store.addRoom({ name: roomForm.value.name });
    showRoomDialog.value = false;
    roomForm.value = { name: '' };
    toast.add({ severity: 'success', summary: t('rooms.created'), life: 3000 });
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: t('errors.occurred'),
      detail: e?.response?.data?.message ?? e?.message,
      life: 5000
    });
  } finally {
    savingRoom.value = false;
  }
};

const openDeviceDialog = () => {
  deviceForm.value = {
    name: '',
    type: 0,
    roomId: selectedRoom.value?.id ?? roomOptions.value[0]?.value ?? null
  };
  showDeviceDialog.value = true;
};

const onRegisterDevice = async () => {
  if (!deviceForm.value.name.trim() || deviceForm.value.roomId == null) return;
  savingDevice.value = true;
  try {
    await store.registerDevice({ ...deviceForm.value });
    showDeviceDialog.value = false;
    toast.add({ severity: 'success', summary: t('rooms.device-registered'), life: 3000 });
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: t('errors.occurred'),
      detail: e?.response?.data?.message ?? e?.message,
      life: 5000
    });
  } finally {
    savingDevice.value = false;
  }
};
</script>

<template>
  <div class="p-4">
    <div class="flex align-items-center justify-content-between flex-wrap gap-2">
      <div>
        <h1 class="mb-1">{{ t('rooms.title') }}</h1>
        <p class="text-secondary mt-0">{{ t('rooms.subtitle') }}</p>
      </div>
      <div class="flex gap-2">
        <pv-button
            :label="t('rooms.new-room')"
            icon="pi pi-plus"
            @click="showRoomDialog = true"
        />
        <pv-button
            :label="t('rooms.register-device')"
            icon="pi pi-microchip"
            severity="secondary"
            :disabled="store.rooms.length === 0"
            @click="openDeviceDialog"
        />
      </div>
    </div>

    <div v-if="loading" class="text-secondary">{{ t('rooms.loading') }}</div>
    <div v-else-if="loadError" class="text-red-500">{{ loadError }}</div>

    <template v-else>
      <p v-if="store.rooms.length === 0" class="text-secondary">
        {{ t('rooms.empty') }}
      </p>

      <div class="grid mt-2">
        <div v-for="room in store.rooms" :key="room.id" class="col-12 md:col-6 lg:col-4">
          <pv-card
              class="room-card"
              :class="{ 'room-card-selected': selectedRoom?.id === room.id }"
              @click="onSelectRoom(room)"
          >
            <template #content>
              <div class="flex align-items-center">
                <i class="pi pi-warehouse text-primary mr-3" style="font-size: 1.6rem"></i>
                <div>
                  <strong>{{ room.name }}</strong>
                  <div class="text-sm text-secondary">ID: {{ room.id }}</div>
                </div>
                <i class="pi pi-chevron-right ml-auto text-secondary"></i>
              </div>
            </template>
          </pv-card>
        </div>
      </div>

      <template v-if="selectedRoom">
        <h3 class="mt-4">
          {{ t('rooms.devices-in', { room: selectedRoom.name }) }}
        </h3>
        <div v-if="loadingDevices" class="text-secondary">{{ t('rooms.loading-devices') }}</div>
        <pv-data-table
            v-else
            :value="selectedRoomDevices"
            striped-rows
            :empty-message="t('rooms.no-devices')"
        >
          <pv-column field="id" header="ID"/>
          <pv-column field="name" :header="t('rooms.device-name')"/>
          <pv-column field="type" :header="t('rooms.device-type-label')"/>
          <pv-column field="status" :header="t('rooms.device-status')"/>
        </pv-data-table>
        <p v-if="!loadingDevices && selectedRoomDevices.length === 0" class="text-secondary">
          {{ t('rooms.no-devices') }}
        </p>
      </template>
    </template>

    <!-- Create room -->
    <pv-dialog
        v-model:visible="showRoomDialog"
        :header="t('rooms.new-room')"
        modal
        :style="{ width: '26rem', maxWidth: '95vw' }"
    >
      <form class="flex flex-column gap-4 pt-2" @submit.prevent="onCreateRoom">
        <pv-float-label variant="on">
          <pv-input-text id="room-name" v-model="roomForm.name" class="w-full" required/>
          <label for="room-name">{{ t('rooms.room-name') }}</label>
        </pv-float-label>
        <div class="flex justify-content-end gap-2">
          <pv-button
              type="button"
              :label="t('actions.cancel')"
              severity="secondary"
              text
              @click="showRoomDialog = false"
          />
          <pv-button
              type="submit"
              :label="t('actions.save')"
              icon="pi pi-check"
              :loading="savingRoom"
              :disabled="!roomForm.name.trim()"
          />
        </div>
      </form>
    </pv-dialog>

    <!-- Register device -->
    <pv-dialog
        v-model:visible="showDeviceDialog"
        :header="t('rooms.register-device')"
        modal
        :style="{ width: '28rem', maxWidth: '95vw' }"
    >
      <form class="flex flex-column gap-4 pt-2" @submit.prevent="onRegisterDevice">
        <pv-float-label variant="on">
          <pv-input-text id="dev-name" v-model="deviceForm.name" class="w-full" required/>
          <label for="dev-name">{{ t('rooms.device-name') }}</label>
        </pv-float-label>

        <pv-float-label variant="on">
          <pv-select
              id="dev-type"
              v-model="deviceForm.type"
              :options="deviceTypeOptions"
              option-label="label"
              option-value="value"
              class="w-full"
          />
          <label for="dev-type">{{ t('rooms.device-type-label') }}</label>
        </pv-float-label>

        <pv-float-label variant="on">
          <pv-select
              id="dev-room"
              v-model="deviceForm.roomId"
              :options="roomOptions"
              option-label="label"
              option-value="value"
              class="w-full"
          />
          <label for="dev-room">{{ t('rooms.room') }}</label>
        </pv-float-label>

        <div class="flex justify-content-end gap-2">
          <pv-button
              type="button"
              :label="t('actions.cancel')"
              severity="secondary"
              text
              @click="showDeviceDialog = false"
          />
          <pv-button
              type="submit"
              :label="t('actions.save')"
              icon="pi pi-check"
              :loading="savingDevice"
              :disabled="!deviceForm.name.trim() || deviceForm.roomId == null"
          />
        </div>
      </form>
    </pv-dialog>
  </div>
</template>

<style scoped>
.room-card { cursor: pointer; transition: transform 0.1s ease, box-shadow 0.1s ease; }
.room-card:hover { transform: translateY(-2px); }
.room-card-selected { outline: 2px solid #d4a017; }
</style>
