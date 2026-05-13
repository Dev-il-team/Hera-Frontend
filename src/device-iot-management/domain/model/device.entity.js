export class DeviceEntity {
    constructor({
                    id = null,
                    name = '',
                    type = '',
                    room = '',
                    status = '',
                    energyConsumption = 0
                }) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.room = room;
        this.status = status;
        this.energyConsumption = energyConsumption;
    }
}