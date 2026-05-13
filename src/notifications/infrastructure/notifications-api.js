import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const notificationsEndpointPath = import.meta.env.VITE_NOTIFICATIONS_ENDPOINT_PATH;

/**
 * Infrastructure service gateway for the Notifications bounded-context endpoints.
 *
 * @class NotificationsApi
 * @extends BaseApi
 */
export class NotificationsApi extends BaseApi {
    #notificationsEndpoint;

    constructor() {
        super();
        this.#notificationsEndpoint = new BaseEndpoint(this, notificationsEndpointPath);
    }

    getNotifications() { return this.#notificationsEndpoint.getAll(); }
    getNotificationById(id) { return this.#notificationsEndpoint.getById(id); }
}
