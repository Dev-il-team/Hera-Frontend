/**
 * Notification entity within the Notifications bounded context.
 *
 * Self-contained: never holds a Camera/Routine object reference.
 * Cross-context links are stringly-typed (relatedEntityType + relatedEntityId).
 * See docs/adr/0002-denormalized-notifications.md.
 *
 * @class Notification
 */
export class Notification {
    /**
     * @param {Object} params
     * @param {?number} [params.id=null]
     * @param {string} [params.title='']
     * @param {string} [params.body='']
     * @param {'alert'|'warning'|'info'|'success'} [params.severity='info']
     * @param {'security'|'energy'|'automation'|'system'} [params.category='system']
     * @param {string} [params.occurredAt=''] - ISO timestamp.
     * @param {boolean} [params.read=false]
     * @param {?string} [params.relatedEntityType=null]
     * @param {?string} [params.relatedEntityId=null]
     */
    constructor({
        id = null,
        title = '',
        body = '',
        severity = 'info',
        category = 'system',
        occurredAt = '',
        read = false,
        relatedEntityType = null,
        relatedEntityId = null
    } = {}) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.severity = severity;
        this.category = category;
        this.occurredAt = occurredAt;
        this.read = read;
        this.relatedEntityType = relatedEntityType;
        this.relatedEntityId = relatedEntityId;
    }
}

/**
 * Maps a Notification category to its PrimeIcons class.
 * @param {string} category
 * @returns {string}
 */
export function iconForCategory(category) {
    switch (category) {
        case 'security':   return 'pi pi-shield';
        case 'energy':     return 'pi pi-chart-line';
        case 'automation': return 'pi pi-bolt';
        case 'system':
        default:           return 'pi pi-info-circle';
    }
}

/**
 * Maps a Notification severity to a CSS color token.
 * @param {string} severity
 * @returns {string}
 */
export function colorForSeverity(severity) {
    switch (severity) {
        case 'alert':   return '#e53935';
        case 'warning': return '#fb8c00';
        case 'success': return '#43a047';
        case 'info':
        default:        return '#1e88e5';
    }
}

/**
 * Maps a notification's related entity to a vue-router target, or null if none.
 * Centralised here so the rest of the app doesn't switch on entity-type strings.
 *
 * @param {Notification} notification
 * @returns {?import('vue-router').RouteLocationRaw}
 */
export function routeForRelatedEntity(notification) {
    if (!notification.relatedEntityType || !notification.relatedEntityId) return null;
    switch (notification.relatedEntityType) {
        case 'camera':  return { name: 'cameras' };
        case 'routine': return { name: 'routines' };
        case 'energy':  return { name: 'home' };
        default:        return null;
    }
}
