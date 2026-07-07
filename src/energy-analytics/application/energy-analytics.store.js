/**
 * Application service store for the `Energy Analytics` bounded context.
 *
 * @module useEnergyAnalyticsStore
 */
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { EnergyAnalyticsApi } from '../infrastructure/energy-analytics-api.js';
import { ConsumptionReport } from '../domain/model/consumption-report.entity.js';

const api = new EnergyAnalyticsApi();

const useEnergyAnalyticsStore = defineStore('energy-analytics', () => {
    const reports = ref([]);
    const reportsLoaded = ref(false);
    const errors = ref([]);

    const totalKilowattHours = computed(() =>
        reports.value.reduce((sum, r) => sum + (Number(r.kilowattHours) || 0), 0)
    );
    const totalCost = computed(() =>
        reports.value.reduce((sum, r) => sum + (Number(r.cost) || 0), 0)
    );

    async function fetchReports() {
        try {
            const response = await api.getConsumptionReports();
            const data = response.data;
            const resources = Array.isArray(data) ? data : (data?.consumptionReports ?? []);
            reports.value = resources.map(r => new ConsumptionReport(r));
            reportsLoaded.value = true;
        } catch (error) {
            errors.value.push(error);
            throw error;
        }
    }

    /**
     * Records a consumption report (POST /consumption-reports).
     * @param {{deviceName: string, period: string, kilowattHours: number, cost: number}} resource
     */
    async function recordConsumption(resource) {
        const response = await api.recordConsumption(resource);
        const created = new ConsumptionReport(response.data ?? resource);
        reports.value.push(created);
        return created;
    }

    return {
        reports,
        reportsLoaded,
        errors,
        totalKilowattHours,
        totalCost,
        fetchReports,
        recordConsumption
    };
});

export default useEnergyAnalyticsStore;
