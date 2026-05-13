<script setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const props = defineProps({
  camera: { type: Object, required: true }
});

const { t } = useI18n();

const connectivityLabel = computed(() => t(`cameras.connectivity.${props.camera.connectivityStatus}`));
const operationalLabel = computed(() => t(`cameras.operational.${props.camera.operationalStatus}`));
const connectivitySeverity = computed(() => props.camera.connectivityStatus === 'online' ? 'success' : 'secondary');
const operationalSeverity = computed(() => {
  switch (props.camera.operationalStatus) {
    case 'alert': return 'danger';
    case 'normal': return 'success';
    default: return 'secondary';
  }
});
</script>

<template>
  <pv-card class="camera-card">
    <template #title>
      <div class="flex justify-content-between align-items-center">
        <span>{{ camera.name }}</span>
        <pv-tag :value="connectivityLabel" :severity="connectivitySeverity" />
      </div>
    </template>
    <template #content>
      <div class="snapshot-frame">
        <img v-if="camera.snapshotUrl" :src="camera.snapshotUrl" :alt="camera.name" class="snapshot-img" />
        <div v-else class="snapshot-placeholder">
          <i class="pi pi-video" style="font-size: 3rem"></i>
        </div>
        <span class="timestamp">{{ camera.lastActivityAt }}</span>
      </div>
      <div class="mt-3">
        <div class="flex align-items-center mb-2">
          <i class="pi pi-shield mr-2"></i>
          <span>{{ t('cameras.status') }}:&nbsp;</span>
          <pv-tag :value="operationalLabel" :severity="operationalSeverity" />
        </div>
        <div class="text-sm text-secondary">
          {{ t('cameras.last-activity') }}: {{ camera.lastActivityAt || t('cameras.unknown') }}
        </div>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.camera-card {
  height: 100%;
}
.snapshot-frame {
  position: relative;
  background: #111;
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
}
.snapshot-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.snapshot-placeholder {
  color: rgba(255, 255, 255, 0.4);
}
.timestamp {
  position: absolute;
  bottom: 6px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}
</style>
