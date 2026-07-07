import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const profilesEndpointPath = import.meta.env.VITE_PROFILES_ENDPOINT_PATH ?? '/profiles';

/**
 * Infrastructure service gateway for the Profile Management bounded-context endpoints.
 *
 * @class ProfileManagementApi
 * @extends BaseApi
 */
export class ProfileManagementApi extends BaseApi {
    #profilesEndpoint;

    constructor() {
        super();
        this.#profilesEndpoint = new BaseEndpoint(this, profilesEndpointPath);
    }

    /** GET /api/v1/profiles */
    getProfiles() { return this.#profilesEndpoint.getAll(); }

    /** GET /api/v1/profiles/{profileId} */
    getProfileById(id) { return this.#profilesEndpoint.getById(id); }

    /** POST /api/v1/profiles */
    createProfile(resource) { return this.#profilesEndpoint.create(resource); }
}
