import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const routinesEndpointPath = import.meta.env.VITE_ROUTINES_ENDPOINT_PATH;

/**
 * Infrastructure service gateway for the Automation bounded-context endpoints.
 *
 * @class AutomationApi
 * @extends BaseApi
 */
export class AutomationApi extends BaseApi {
    #routinesEndpoint;

    constructor() {
        super();
        this.#routinesEndpoint = new BaseEndpoint(this, routinesEndpointPath);
    }

    getRoutines() { return this.#routinesEndpoint.getAll(); }
    getRoutineById(id) { return this.#routinesEndpoint.getById(id); }
    createRoutine(resource) { return this.#routinesEndpoint.create(resource); }
}
