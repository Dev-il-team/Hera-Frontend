/**
 * Application service store for the `Profile Management` bounded context.
 *
 * @module useProfileManagementStore
 */
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { ProfileManagementApi } from '../infrastructure/profile-management-api.js';
import { ProfileAssembler } from '../infrastructure/profile.assembler.js';

const api = new ProfileManagementApi();

const useProfileManagementStore = defineStore('profile-management', () => {
    const profiles = ref([]);
    const profilesLoaded = ref(false);
    const errors = ref([]);

    const profilesCount = computed(() => profiles.value.length);

    async function fetchProfiles() {
        try {
            const response = await api.getProfiles();
            profiles.value = ProfileAssembler.toEntitiesFromResponse(response);
            profilesLoaded.value = true;
        } catch (error) {
            errors.value.push(error);
            throw error;
        }
    }

    async function addProfile(profile) {
        const response = await api.createProfile(profile);
        const created = ProfileAssembler.toEntityFromResource(response.data);
        profiles.value.push(created);
        return created;
    }

    return { profiles, profilesLoaded, errors, profilesCount, fetchProfiles, addProfile };
});

export default useProfileManagementStore;
