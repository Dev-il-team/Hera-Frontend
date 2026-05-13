import { Camera } from '../domain/model/camera.entity.js';

/**
 * Maps camera resources into domain entities.
 *
 * @class CameraAssembler
 */
export class CameraAssembler {
    /**
     * @param {Object} resource - Camera resource payload.
     * @returns {Camera} Camera entity.
     */
    static toEntityFromResource(resource) {
        return new Camera({ ...resource });
    }

    /**
     * @param {import('axios').AxiosResponse<Array<Object>|Object>} response - HTTP response.
     * @returns {Camera[]} Camera entities.
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        const resources = response.data instanceof Array ? response.data : response.data['cameras'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
