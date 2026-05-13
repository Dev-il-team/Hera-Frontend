/**
 * Camera entity within the Device IoT Management bounded context.
 *
 * @class Camera
 */
export class Camera {
    /**
     * @param {Object} params - Entity attributes.
     * @param {?number} [params.id=null] - Camera identifier.
     * @param {string} [params.name=''] - Display name (e.g. "Cámara 1 - Sala").
     * @param {string} [params.location=''] - Human-readable location label.
     * @param {string} [params.snapshotUrl=''] - URL of the latest still frame.
     * @param {string} [params.lastActivityAt=''] - ISO timestamp of last activity.
     * @param {'online'|'offline'} [params.connectivityStatus='offline'] - Whether the device is reachable.
     * @param {'normal'|'alert'|'unknown'} [params.operationalStatus='unknown'] - What the device is observing.
     */
    constructor({
        id = null,
        name = '',
        location = '',
        snapshotUrl = '',
        lastActivityAt = '',
        connectivityStatus = 'offline',
        operationalStatus = 'unknown'
    } = {}) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.snapshotUrl = snapshotUrl;
        this.lastActivityAt = lastActivityAt;
        this.connectivityStatus = connectivityStatus;
        this.operationalStatus = operationalStatus;
    }
}
