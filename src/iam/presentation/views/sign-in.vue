<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import useIamStore from '../../application/iam.store.js';
import logo from '../../../assets/images/hera-logo.png';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const store = useIamStore();

const form = ref({ username: '', password: '' });
const submitting = ref(false);
const error = ref(null);

const onSubmit = async () => {
  if (!form.value.username.trim() || !form.value.password) return;
  submitting.value = true;
  error.value = null;
  try {
    await store.signIn({ ...form.value });
    const redirect = route.query['redirect'];
    await router.push(typeof redirect === 'string' ? redirect : { name: 'home' });
  } catch (e) {
    error.value = e?.response?.status === 401 || e?.response?.status === 404
        ? t('auth.invalid-credentials')
        : (e?.response?.data?.message ?? e?.message ?? t('auth.generic-error'));
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
          <h1 class="m-0">{{ t('auth.sign-in.title') }}</h1>
          <p class="m-0 text-secondary">{{ t('auth.sign-in.subtitle') }}</p>
        </div>

        <form class="flex flex-column gap-4" @submit.prevent="onSubmit">
          <pv-float-label variant="on">
            <pv-input-text
                id="si-username"
                v-model="form.username"
                class="w-full"
                autocomplete="username"
                required
            />
            <label for="si-username">{{ t('auth.username') }}</label>
          </pv-float-label>

          <pv-float-label variant="on">
            <pv-input-text
                id="si-password"
                v-model="form.password"
                type="password"
                class="w-full"
                autocomplete="current-password"
                required
            />
            <label for="si-password">{{ t('auth.password') }}</label>
          </pv-float-label>

          <small v-if="error" class="auth-error" role="alert">{{ error }}</small>

          <pv-button
              type="submit"
              :label="t('auth.sign-in.action')"
              icon="pi pi-sign-in"
              :loading="submitting"
              :disabled="!form.username.trim() || !form.password"
              class="w-full"
          />
        </form>

        <p class="text-center mt-4 mb-0">
          {{ t('auth.sign-in.no-account') }}
          <router-link :to="{ name: 'sign-up' }" class="auth-link">
            {{ t('auth.sign-up.action') }}
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
