/**
 * Profile entity within the Profile Management bounded context.
 *
 * @class Profile
 */
export class Profile {
    constructor({
        id = null,
        firstName = '',
        lastName = '',
        email = '',
        street = '',
        number = '',
        city = '',
        postalCode = '',
        country = ''
    } = {}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.street = street;
        this.number = number;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
    }

    get fullName() { return `${this.firstName} ${this.lastName}`.trim(); }

    get fullAddress() {
        const parts = [
            [this.street, this.number].filter(Boolean).join(' '),
            this.city,
            this.postalCode,
            this.country
        ].filter(Boolean);
        return parts.join(', ');
    }
}
