/**
 * Application service store for the `IAM` bounded context.
 * Holds the authenticated session (JWT) and exposes sign-in / sign-up / sign-out.
 *
 * The JWT sent by the backend is persisted in localStorage so the session
 * survives page reloads, and is attached as a Bearer token by base-api.js.
 *
 * @module useIamStore
 */
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { IamApi } from '../infrastructure/iam-api.js';

const api = new IamApi();

export const TOKEN_STORAGE_KEY = 'hera.auth.token';
export const USERNAME_STORAGE_KEY = 'hera.auth.username';
export const USER_ID_STORAGE_KEY = 'hera.auth.userId';

/** Defensively extract the JWT from the sign-in response payload. */
function extractToken(data) {
    return data?.token ?? data?.accessToken ?? data?.jwt ?? data?.bearerToken ?? null;
}

const useIamStore = defineStore('iam', () => {
    const token = ref(localStorage.getItem(TOKEN_STORAGE_KEY));
    const username = ref(localStorage.getItem(USERNAME_STORAGE_KEY));
    const userId = ref(localStorage.getItem(USER_ID_STORAGE_KEY));
    const errors = ref([]);

    const isSignedIn = computed(() => !!token.value);

    /**
     * Signs in against POST /authentication/sign-in and stores the JWT.
     * @param {{username: string, password: string}} credentials
     */
    async function signIn(credentials) {
        const response = await api.signIn(credentials);
        const jwt = extractToken(response.data);
        if (!jwt) throw new Error('No token received from the server.');

        token.value = jwt;
        username.value = response.data?.username ?? credentials.username;
        userId.value = response.data?.id != null ? String(response.data.id) : null;

        localStorage.setItem(TOKEN_STORAGE_KEY, token.value);
        localStorage.setItem(USERNAME_STORAGE_KEY, username.value);
        if (userId.value) localStorage.setItem(USER_ID_STORAGE_KEY, userId.value);
        return response.data;
    }

    /**
     * Registers a new user against POST /authentication/sign-up.
     * @param {{username: string, password: string}} credentials
     */
    async function signUp(credentials) {
        const response = await api.signUp(credentials);
        return response.data;
    }

    /** Clears the session locally. */
    function signOut() {
        token.value = null;
        username.value = null;
        userId.value = null;
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(USERNAME_STORAGE_KEY);
        localStorage.removeItem(USER_ID_STORAGE_KEY);
    }

    return { token, username, userId, errors, isSignedIn, signIn, signUp, signOut };
});

export default useIamStore;
