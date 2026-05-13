<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import useAutomationStore from '../../application/automation.store.js';
import { Routine } from '../../domain/model/routine.entity.js';

const { t } = useI18n();
const router = useRouter();
const store = useAutomationStore();
const { addRoutine } = store;

const triggerTypeOptions = computed(() => [
  { label: t('routines.trigger-type.schedule'),  value: 'schedule' },
  { label: t('routines.trigger-type.condition'), value: 'condition' },
  { label: t('routines.trigger-type.interval'),  value: 'interval' }
]);

const frequencyOptions = computed(() => [
  { label: t('routines.frequency.daily'),  value: 'daily' },
  { label: t('routines.frequency.weekly'), value: 'weekly' },
  { label: t('routines.frequency.hourly'), value: 'hourly' }
]);

const sensorOptions = computed(() => [
  { label: t('routines.sensor.temperature'), value: 'temperature' },
  { label: t('routines.sensor.humidity'),    value: 'humidity' },
  { label: t('routines.sensor.motion'),      value: 'motion' }
]);

const unitOptions = computed(() => [
  { label: t('routines.unit.minutes'), value: 'minutes' },
  { label: t('routines.unit.hours'),   value: 'hours' },
  { label: t('routines.unit.days'),    value: 'days' }
]);

const commandOptions = computed(() => [
  { label: t('routines.command.turn-on'),         value: 'turn-on' },
  { label: t('routines.command.turn-off'),        value: 'turn-off' },
  { label: t('routines.command.set-temperature'), value: 'set-temperature' }
]);

const operatorOptions = ['>', '<', '>=', '<=', '=='];

const form = ref({
  name: '',
  description: '',
  triggerType: 'schedule',
  schedule: { time: '07:00', frequency: 'daily' },
  condition: { sensorType: 'temperature', operator: '>', threshold: 20 },
  interval: { every: 1, unit: 'hours' },
  deviceId: '',
  command: 'turn-on',
  status: 'active'
});

const submitting = ref(false);
const submitError = ref(null);

const buildTrigger = () => {
  switch (form.value.triggerType) {
    case 'schedule':  return { type: 'schedule', ...form.value.schedule };
    case 'condition': return { type: 'condition', ...form.value.condition };
    case 'interval':  return { type: 'interval', ...form.value.interval };
  }
};

const isValid = computed(() =>
  form.value.name.trim().length > 0 && form.value.deviceId.trim().length > 0
);

const onSubmit = async () => {
  if (!isValid.value) return;
  submitting.value = true;
  submitError.value = null;
  try {
    const routine = new Routine({
      name: form.value.name,
      description: form.value.description,
      trigger: buildTrigger(),
      action: { deviceId: form.value.deviceId, command: form.value.command },
      status: form.value.status,
      nextExecution: null
    });
    await addRoutine(routine);
    router.push({ name: 'routines' });
  } catch (e) {
    submitError.value = e?.message ?? String(e);
  } finally {
    submitting.value = false;
  }
};

const onCancel = () => router.push({ name: 'routines' });
</script>

<template>
  <div class="p-4">
    <h1>{{ t('routines.new-title') }}</h1>
    <p class="text-secondary">{{ t('routines.new-subtitle') }}</p>

    <form class="form-grid mt-4" @submit.prevent="onSubmit">
      <div class="field">
        <label for="name">{{ t('routines.form.name') }}</label>
        <pv-input-text id="name" v-model="form.name" class="w-full" required />
      </div>

      <div class="field">
        <label for="description">{{ t('routines.form.description') }}</label>
        <pv-input-text id="description" v-model="form.description" class="w-full" />
      </div>

      <div class="field">
        <label>{{ t('routines.form.trigger-type') }}</label>
        <pv-select v-model="form.triggerType" :options="triggerTypeOptions" option-label="label" option-value="value" class="w-full" />
      </div>

      <template v-if="form.triggerType === 'schedule'">
        <div class="field">
          <label for="time">{{ t('routines.form.time') }}</label>
          <pv-input-text id="time" v-model="form.schedule.time" placeholder="HH:MM" class="w-full" />
        </div>
        <div class="field">
          <label>{{ t('routines.form.frequency') }}</label>
          <pv-select v-model="form.schedule.frequency" :options="frequencyOptions" option-label="label" option-value="value" class="w-full" />
        </div>
      </template>

      <template v-else-if="form.triggerType === 'condition'">
        <div class="field">
          <label>{{ t('routines.form.sensor') }}</label>
          <pv-select v-model="form.condition.sensorType" :options="sensorOptions" option-label="label" option-value="value" class="w-full" />
        </div>
        <div class="field">
          <label>{{ t('routines.form.operator') }}</label>
          <pv-select v-model="form.condition.operator" :options="operatorOptions" class="w-full" />
        </div>
        <div class="field">
          <label for="threshold">{{ t('routines.form.threshold') }}</label>
          <pv-input-number id="threshold" v-model="form.condition.threshold" class="w-full" />
        </div>
      </template>

      <template v-else-if="form.triggerType === 'interval'">
        <div class="field">
          <label for="every">{{ t('routines.form.every') }}</label>
          <pv-input-number id="every" v-model="form.interval.every" :min="1" class="w-full" />
        </div>
        <div class="field">
          <label>{{ t('routines.form.unit') }}</label>
          <pv-select v-model="form.interval.unit" :options="unitOptions" option-label="label" option-value="value" class="w-full" />
        </div>
      </template>

      <div class="field">
        <label for="deviceId">{{ t('routines.form.device-id') }}</label>
        <pv-input-text id="deviceId" v-model="form.deviceId" class="w-full" required />
      </div>

      <div class="field">
        <label>{{ t('routines.form.command') }}</label>
        <pv-select v-model="form.command" :options="commandOptions" option-label="label" option-value="value" class="w-full" />
      </div>

      <div class="actions">
        <pv-button type="submit" :label="t('routines.form.save')" icon="pi pi-save" :loading="submitting" :disabled="!isValid" />
        <pv-button type="button" :label="t('routines.form.cancel')" severity="secondary" class="ml-2" @click="onCancel" />
      </div>

      <div v-if="submitError" class="text-red-500 mt-2">{{ submitError }}</div>
    </form>
  </div>
</template>

<style scoped>
.form-grid {
  display: grid;
  gap: 16px;
  max-width: 520px;
}
.field { display: flex; flex-direction: column; gap: 6px; }
.actions { margin-top: 8px; }
</style>
