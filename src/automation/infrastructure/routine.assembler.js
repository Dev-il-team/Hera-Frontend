import { Routine } from '../domain/model/routine.entity.js';

/**
 * Maps routine resources into domain entities.
 *
 * @class RoutineAssembler
 */
export class RoutineAssembler {
    /**
     * @param {Object} resource - Routine resource payload.
     * @returns {Routine} Routine entity.
     */
    static toEntityFromResource(resource) {
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
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
