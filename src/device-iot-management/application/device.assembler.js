import { DeviceEntity } from '../domain/model/device.entity.js';

export class DeviceAssembler {
    static toEntityFromResource(resource) {
        return new DeviceEntity({
            id: resource.id,
            name: resource.name,
            type: resource.type,
            room: resource.room ?? resource.roomId ?? '',
            status: resource.status ?? '',
            energyConsumption: resource.energyConsumption ?? 0
        });
    }

    static toEntitiesFromResponse(response) {
        const resources = Array.isArray(response) ? response : (response?.devices ?? []);
        return resources.map(device => this.toEntityFromResource(device));
    }

    /**
     * Maps to the backend contract: POST /devices expects
     * { name: string, type: number, roomId: number }.
     */
    static toResourceFromEntity(entity) {
        return {
            name: entity.name,
            type: Number(entity.type) || 0,
            roomId: Number(entity.roomId ?? entity.room) || 0
        };
    }
}
