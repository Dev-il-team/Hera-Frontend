import { Profile } from '../domain/model/profile.entity.js';

/**
 * Assembles Profile entities from API resources/responses.
 */
export class ProfileAssembler {
    static toEntityFromResource(resource) {
        return new Profile(resource ?? {});
    }

    static toEntitiesFromResponse(response) {
        const data = response?.data;
        const resources = Array.isArray(data) ? data : (data?.profiles ?? []);
        return resources.map(r => this.toEntityFromResource(r));
    }
}
