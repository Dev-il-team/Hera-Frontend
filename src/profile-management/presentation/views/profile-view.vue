<script setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import useProfileManagementStore from '../../application/profile-management.store.js';
import useIamStore from '../../../iam/application/iam.store.js';

const { t } = useI18n();
const toast = useToast();
const store = useProfileManagementStore();
const iam = useIamStore();

const loading = ref(true);
const loadError = ref(null);
const showCreateDialog = ref(false);
const submitting = ref(false);

const emptyForm = () => ({
  firstName: '', lastName: '', email: '',
  street: '', number: '', city: '', postalCode: '', country: ''
});
const form = ref(emptyForm());

const myProfile = computed(() => store.profiles[0] ?? null);

const isValid = computed(() =>
    form.value.firstName.trim() && form.value.lastName.trim() && form.value.email.trim()
);

onMounted(async () => {
  try {
    await store.fetchProfiles();
  } catch (e) {
    loadError.value = e?.response?.data?.message ?? e?.message;
  } finally {
    loading.value = false;
  }
});

const onCreate = async () => {
  if (!isValid.value) return;
  submitting.value = true;
  try {
    await store.addProfile({ ...form.value });
    showCreateDialog.value = false;
    form.value = emptyForm();
    toast.add({ severity: 'success', summary: t('profile.created'), life: 3000 });
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: t('errors.occurred'),
      detail: e?.response?.data?.message ?? e?.message,
      life: 5000
    });
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <div class="p-4">
    <div class="flex align-items-center justify-content-between flex-wrap gap-2">
      <div>
        <h1 class="mb-1">{{ t('profile.title') }}</h1>
        <p class="text-secondary mt-0">{{ t('profile.subtitle') }}</p>
      </div>
      <pv-button
          :label="t('profile.create')"
          icon="pi pi-user-plus"
          @click="showCreateDialog = true"
      />
    </div>

    <div v-if="loading" class="text-secondary">{{ t('profile.loading') }}</div>
    <div v-else-if="loadError" class="text-red-500">{{ loadError }}</div>

    <template v-else>
      <pv-card v-if="myProfile" class="mt-3 profile-card">
        <template #content>
          <div class="flex align-items-center gap-4 flex-wrap">
            <div class="profile-avatar"><i class="pi pi-user"></i></div>
            <div>
              <h2 class="m-0">{{ myProfile.fullName }}</h2>
              <p class="m-0 text-secondary">
                <i class="pi pi-envelope mr-1"></i>{{ myProfile.email }}
              </p>
              <p class="m-0 text-secondary" v-if="myProfile.fullAddress">
                <i class="pi pi-map-marker mr-1"></i>{{ myProfile.fullAddress }}
              </p>
              <p class="m-0 text-secondary" v-if="iam.username">
                <i class="pi pi-id-card mr-1"></i>{{ t('auth.username') }}: {{ iam.username }}
              </p>
            </div>
          </div>
        </template>
      </pv-card>

      <pv-card v-else class="mt-3">
        <template #content>
          <div class="text-center p-4">
            <i class="pi pi-user text-4xl text-secondary"></i>
            <p>{{ t('profile.empty') }}</p>
            <pv-button
                :label="t('profile.create')"
                icon="pi pi-user-plus"
                @click="showCreateDialog = true"
            />
          </div>
        </template>
      </pv-card>

      <template v-if="store.profiles.length > 1">
        <h3>{{ t('profile.all-profiles') }}</h3>
        <pv-data-table :value="store.profiles" striped-rows>
          <pv-column field="id" header="ID"/>
          <pv-column field="fullName" :header="t('profile.name')"/>
          <pv-column field="email" :header="t('profile.email')"/>
          <pv-column field="fullAddress" :header="t('profile.address')"/>
        </pv-data-table>
      </template>
    </template>

    <pv-dialog
        v-model:visible="showCreateDialog"
        :header="t('profile.create')"
        modal
        :style="{ width: '34rem', maxWidth: '95vw' }"
    >
      <form class="flex flex-column gap-4 pt-2" @submit.prevent="onCreate">
        <div class="grid">
          <div class="col-6">
            <pv-float-label variant="on">
              <pv-input-text id="p-first" v-model="form.firstName" class="w-full" required/>
              <label for="p-first">{{ t('profile.first-name') }}</label>
            </pv-float-label>
          </div>
          <div class="col-6">
            <pv-float-label variant="on">
              <pv-input-text id="p-last" v-model="form.lastName" class="w-full" required/>
              <label for="p-last">{{ t('profile.last-name') }}</label>
            </pv-float-label>
          </div>
          <div class="col-12">
            <pv-float-label variant="on">
              <pv-input-text id="p-email" v-model="form.email" type="email" class="w-full" required/>
              <label for="p-email">{{ t('profile.email') }}</label>
            </pv-float-label>
          </div>
          <div class="col-8">
            <pv-float-label variant="on">
              <pv-input-text id="p-street" v-model="form.street" class="w-full"/>
              <label for="p-street">{{ t('profile.street') }}</label>
            </pv-float-label>
          </div>
          <div class="col-4">
            <pv-float-label variant="on">
              <pv-input-text id="p-number" v-model="form.number" class="w-full"/>
              <label for="p-number">{{ t('profile.number') }}</label>
            </pv-float-label>
          </div>
          <div class="col-6">
            <pv-float-label variant="on">
              <pv-input-text id="p-city" v-model="form.city" class="w-full"/>
              <label for="p-city">{{ t('profile.city') }}</label>
            </pv-float-label>
          </div>
          <div class="col-6">
            <pv-float-label variant="on">
              <pv-input-text id="p-postal" v-model="form.postalCode" class="w-full"/>
              <label for="p-postal">{{ t('profile.postal-code') }}</label>
            </pv-float-label>
          </div>
          <div class="col-12">
            <pv-float-label variant="on">
              <pv-input-text id="p-country" v-model="form.country" class="w-full"/>
              <label for="p-country">{{ t('profile.country') }}</label>
            </pv-float-label>
          </div>
        </div>

        <div class="flex justify-content-end gap-2">
          <pv-button
              type="button"
              :label="t('actions.cancel')"
              severity="secondary"
              text
              @click="showCreateDialog = false"
          />
          <pv-button
              type="submit"
              :label="t('actions.save')"
              icon="pi pi-check"
              :loading="submitting"
              :disabled="!isValid"
          />
        </div>
      </form>
    </pv-dialog>
  </div>
</template>

<style scoped>
.profile-card { border-left: 4px solid #d4a017; }
.profile-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #1a1f2b;
  color: #d4a017;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
}
</style>
