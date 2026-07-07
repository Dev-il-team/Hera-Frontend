/**
 * Application service store for the `Automation` bounded context.
 *
 * @module useAutomationStore
 */
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AutomationApi } from '../infrastructure/automation-api.js';
import { RoutineAssembler } from '../infrastructure/routine.assembler.js';

const api = new AutomationApi();

const useAutomationStore = defineStore('automation', () => {
    const routines = ref([]);
    const routinesLoaded = ref(false);
    const errors = ref([]);

    const routinesCount = computed(() => routines.value.length);
    const activeRoutinesCount = computed(() => routines.value.filter(r => r.status === 'active').length);

    function fetchRoutines() {
        api.getRoutines().then(response => {
            routines.value = RoutineAssembler.toEntitiesFromResponse(response);
            routinesLoaded.value = true;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function getRoutineById(id) {
        const idNum = parseInt(id);
        return routines.value.find(r => r.id === idNum);
    }

    function addRoutine(routine) {
        // Map the rich Routine entity to the backend contract
        // { name, scheduledTime, triggerType } before posting.
        const resource = RoutineAssembler.toResourceFromEntity(routine);
        return api.createRoutine(resource).then(response => {
            const resource = response.data;
            const newRoutine = RoutineAssembler.toEntityFromResource(resource);
            routines.value.push(newRoutine);
            return newRoutine;
        }).catch(error => {
            errors.value.push(error);
            throw error;
        });
    }

    return {
        routines,
        routinesLoaded,
        errors,
        routinesCount,
        activeRoutinesCount,
        fetchRoutines,
        getRoutineById,
        addRoutine
    };
});

export default useAutomationStore;
