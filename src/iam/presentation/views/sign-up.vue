<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import useIamStore from '../../application/iam.store.js';
import logo from '../../../assets/images/hera-logo.png';

const { t } = useI18n();
const router = useRouter();
const toast = useToast();
const store = useIamStore();

const form = ref({ username: '', password: '', confirmPassword: '' });
const submitting = ref(false);
const error = ref(null);

const passwordsMatch = computed(() =>
    form.value.password === form.value.confirmPassword
);
const isValid = computed(() =>
    form.value.username.trim().length > 0 &&
    form.value.password.length >= 6 &&
    passwordsMatch.value
);

const onSubmit = async () => {
  if (!isValid.value) return;
  submitting.value = true;
  error.value = null;
  try {
    await store.signUp({
      username: form.value.username,
      password: form.value.password
    });
    toast.add({
      severity: 'success',
      summary: t('auth.sign-up.success-title'),
      detail: t('auth.sign-up.success-detail'),
      life: 4000
    });
    await router.push({ name: 'sign-in' });
  } catch (e) {
    error.value = e?.response?.data?.message ?? e?.message ?? t('auth.generic-error');
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <div class="auth-page">
    <pv-card class="auth-card">
      <template #content>
        <div class="flex flex-column align-items-center gap-2 mb-4">
          <img :src="logo" alt="Hera" class="auth-logo"/>
          <h1 class="m-0">{{ t('auth.sign-up.title') }}</h1>
          <p class="m-0 text-secondary">{{ t('auth.sign-up.subtitle') }}</p>
        </div>

        <form class="flex flex-column gap-4" @submit.prevent="onSubmit">
          <pv-float-label variant="on">
            <pv-input-text
                id="su-username"
                v-model="form.username"
                class="w-full"
                autocomplete="username"
                required
            />
            <label for="su-username">{{ t('auth.username') }}</label>
          </pv-float-label>

          <pv-float-label variant="on">
            <pv-input-text
                id="su-password"
                v-model="form.password"
                type="password"
                class="w-full"
                autocomplete="new-password"
                required
            />
            <label for="su-password">{{ t('auth.password') }}</label>
          </pv-float-label>
          <small class="text-secondary">{{ t('auth.sign-up.password-hint') }}</small>

          <pv-float-label variant="on">
            <pv-input-text
                id="su-confirm"
                v-model="form.confirmPassword"
                type="password"
                class="w-full"
                autocomplete="new-password"
                required
            />
            <label for="su-confirm">{{ t('auth.confirm-password') }}</label>
          </pv-float-label>
          <small v-if="form.confirmPassword && !passwordsMatch" class="auth-error">
            {{ t('auth.sign-up.passwords-mismatch') }}
          </small>

          <small v-if="error" class="auth-error" role="alert">{{ error }}</small>

          <pv-button
              type="submit"
              :label="t('auth.sign-up.action')"
              icon="pi pi-user-plus"
              :loading="submitting"
              :disabled="!isValid"
              class="w-full"
          />
        </form>

        <p class="text-center mt-4 mb-0">
          {{ t('auth.sign-up.have-account') }}
          <router-link :to="{ name: 'sign-in' }" class="auth-link">
            {{ t('auth.sign-in.action') }}
          </router-link>
        </p>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: linear-gradient(160deg, #1a1f2b 0%, #2c3444 100%);
}
.auth-card { width: 100%; max-width: 420px; }
.auth-logo { width: 72px; height: 72px; object-fit: contain; }
.auth-error { color: var(--p-red-500, #e24c4c); }
.auth-link { color: #d4a017; font-weight: 600; text-decoration: none; }
.auth-link:hover { text-decoration: underline; }
</style>
