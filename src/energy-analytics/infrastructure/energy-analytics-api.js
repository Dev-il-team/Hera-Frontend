import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const consumptionReportsEndpointPath =
    import.meta.env.VITE_CONSUMPTION_REPORTS_ENDPOINT_PATH ?? '/consumption-reports';

/**
 * Infrastructure service gateway for the Energy Analytics bounded-context endpoints.
 *
 * @class EnergyAnalyticsApi
 * @extends BaseApi
 */
export class EnergyAnalyticsApi extends BaseApi {
    #consumptionReportsEndpoint;

    constructor() {
        super();
        this.#consumptionReportsEndpoint =
            new BaseEndpoint(this, consumptionReportsEndpointPath);
    }

    /** GET /api/v1/consumption-reports */
    getConsumptionReports() { return this.#consumptionReportsEndpoint.getAll(); }

    /** GET /api/v1/consumption-reports/{consumptionReportId} */
    getConsumptionReportById(id) { return this.#consumptionReportsEndpoint.getById(id); }

    /**
     * POST /api/v1/consumption-reports — Record a new energy consumption report.
     * @param {{deviceName: string, period: string, kilowattHours: number, cost: number}} resource
     */
    recordConsumption(resource) { return this.#consumptionReportsEndpoint.create(resource); }
}
