/**
 * ConsumptionReport entity within the Energy Analytics bounded context.
 *
 * @class ConsumptionReport
 */
export class ConsumptionReport {
    /**
     * @param {Object} params
     * @param {?number} [params.id=null] - Report identifier.
     * @param {string} [params.deviceName=''] - Device the consumption belongs to.
     * @param {string} [params.period=''] - Reported period (e.g. "2026-07").
     * @param {number} [params.kilowattHours=0] - Consumed energy in kWh.
     * @param {number} [params.cost=0] - Cost of the consumed energy.
     */
    constructor({
        id = null,
        deviceName = '',
        period = '',
        kilowattHours = 0,
        cost = 0
    } = {}) {
        this.id = id;
        this.deviceName = deviceName;
        this.period = period;
        this.kilowattHours = kilowattHours;
        this.cost = cost;
    }
}
