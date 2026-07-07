import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const subscriptionsEndpointPath =
    import.meta.env.VITE_SUBSCRIPTIONS_ENDPOINT_PATH ?? '/subscriptions';

/**
 * Infrastructure service gateway for the Subscription Management bounded-context endpoints.
 *
 * @class SubscriptionManagementApi
 * @extends BaseApi
 */
export class SubscriptionManagementApi extends BaseApi {
    #subscriptionsEndpoint;

    constructor() {
        super();
        this.#subscriptionsEndpoint = new BaseEndpoint(this, subscriptionsEndpointPath);
    }

    /** GET /api/v1/subscriptions */
    getSubscriptions() { return this.#subscriptionsEndpoint.getAll(); }

    /** GET /api/v1/subscriptions/{subscriptionId} */
    getSubscriptionById(id) { return this.#subscriptionsEndpoint.getById(id); }

    /** POST /api/v1/subscriptions — Subscribe. */
    subscribe(resource) { return this.#subscriptionsEndpoint.create(resource); }
}
