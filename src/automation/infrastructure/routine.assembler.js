import { Routine } from '../domain/model/routine.entity.js';

/**
 * Backend triggerType enum: 0 = schedule, 1 = condition, 2 = interval.
 */
const TRIGGER_TYPE_TO_CODE = { schedule: 0, condition: 1, interval: 2 };
const CODE_TO_TRIGGER_TYPE = ['schedule', 'condition', 'interval'];

/**
 * Maps routine resources into domain entities and back.
 *
 * The backend contract for POST /routines is:
 * { name: string, scheduledTime: string, triggerType: number }
 *
 * @class RoutineAssembler
 */
export class RoutineAssembler {
    /**
     * @param {Object} resource - Routine resource payload from the backend.
     * @returns {Routine} Routine entity.
     */
    static toEntityFromResource(resource) {
        // Backend resources carry scheduledTime/triggerType instead of a trigger object.
        if (resource && resource.trigger === undefined && resource.triggerType !== undefined) {
            const type = CODE_TO_TRIGGER_TYPE[resource.triggerType] ?? 'schedule';
            return new Routine({
                ...resource,
                trigger: {
                    type,
                    time: resource.scheduledTime ?? '',
                    frequency: 'daily'
                },
                status: resource.status ?? 'active'
            });
        }
        return new Routine({ ...resource });
    }

    /**
     * @param {import('axios').AxiosResponse<Array<Object>|Object>} response - HTTP response.
     * @returns {Routine[]} Routine entities.
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        const resources = response.data instanceof Array ? response.data : response.data['routines'];
        return (resources ?? []).map(resource => this.toEntityFromResource(resource));
    }

    /**
     * Maps a Routine entity to the backend resource contract:
     * { name, scheduledTime, triggerType }.
     *
     * @param {Routine} entity
     * @returns {{name: string, scheduledTime: string, triggerType: number}}
     */
    static toResourceFromEntity(entity) {
        const trigger = entity.trigger ?? { type: 'schedule' };
        let scheduledTime;
        switch (trigger.type) {
            case 'schedule':
                scheduledTime = trigger.time || '00:00';
                break;
            case 'condition':
                scheduledTime = `${trigger.sensorType} ${trigger.operator} ${trigger.threshold}`;
                break;
            case 'interval':
                scheduledTime = `every ${trigger.every} ${trigger.unit}`;
                break;
            default:
                scheduledTime = '00:00';
        }
        return {
            name: entity.name,
            scheduledTime,
            triggerType: TRIGGER_TYPE_TO_CODE[trigger.type] ?? 0
        };
    }
}
