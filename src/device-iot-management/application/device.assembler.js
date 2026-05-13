import { DeviceEntity } from '../domain/model/device.entity.js';

export class DeviceAssembler {
    static toEntityFromResource(resource) {
        return new DeviceEntity({
            id: resource.id,
            name: resource.name,
            type: resource.type,
            room: resource.room,
            status: resource.status,
            energyConsumption: resource.energyConsumption
        });
    }

    static toEntitiesFromResponse(response) {
        return response.map(device =>
            this.toEntityFromResource(device)
        );
    }

    static toResourceFromEntity(entity) {
        return {
            id: entity.id,
            name: entity.name,
            type: entity.type,
            room: entity.room,
            status: entity.status,
            energyConsumption: entity.energyConsumption
        };
    }
}