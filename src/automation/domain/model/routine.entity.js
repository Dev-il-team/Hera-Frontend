/**
 * Routine entity within the Automation bounded context.
 *
 * A Routine pairs a Trigger (when) with an Action (what). Triggers are a tagged
 * union — see `trigger.type`. The fake API never actually fires them.
 *
 * @class Routine
 */
export class Routine {
    /**
     * @param {Object} params
     * @param {?number} [params.id=null]
     * @param {string} [params.name='']
     * @param {string} [params.description='']
     * @param {Object} [params.trigger={ type: 'schedule' }] - Tagged union, see below.
     * @param {Object} [params.action={ deviceId: null, command: '' }]
     * @param {'active'|'inactive'} [params.status='inactive']
     * @param {?string} [params.nextExecution=null] - ISO timestamp; hand-seeded.
     */
    constructor({
        id = null,
        name = '',
        description = '',
        trigger = { type: 'schedule' },
        action = { deviceId: null, command: '' },
        status = 'inactive',
        nextExecution = null
    } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.trigger = trigger;
        this.action = action;
        this.status = status;
        this.nextExecution = nextExecution;
    }
}

/**
 * Renders a Trigger as a human-readable string for the list view.
 * Falls back to the raw `type` if the variant is unknown.
 *
 * @param {Object} trigger
 * @param {(key: string, params?: Object) => string} t - vue-i18n translator.
 * @returns {string}
 */
export function formatTrigger(trigger, t) {
    if (!trigger || !trigger.type) return '';
    switch (trigger.type) {
        case 'schedule':
            return t('routines.trigger.schedule', { time: trigger.time, frequency: t(`routines.frequency.${trigger.frequency}`) });
        case 'condition':
            return t('routines.trigger.condition', {
                sensor: t(`routines.sensor.${trigger.sensorType}`),
                operator: trigger.operator,
                threshold: trigger.threshold
            });
        case 'interval':
            return t('routines.trigger.interval', { every: trigger.every, unit: t(`routines.unit.${trigger.unit}`) });
        default:
            return trigger.type;
    }
}
