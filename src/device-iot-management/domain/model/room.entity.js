/**
 * Room entity within the Device IoT Management bounded context.
 *
 * @class Room
 */
export class Room {
    /**
     * @param {Object} params
     * @param {?number} [params.id=null] - Room identifier.
     * @param {string} [params.name=''] - Room display name.
     */
    constructor({ id = null, name = '' } = {}) {
        this.id = id;
        this.name = name;
    }
}
