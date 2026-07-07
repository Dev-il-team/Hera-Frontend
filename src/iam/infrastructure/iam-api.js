import { BaseApi } from '../../shared/infrastructure/base-api.js';

const authenticationEndpointPath =
    import.meta.env.VITE_AUTHENTICATION_ENDPOINT_PATH ?? '/authentication';
const usersEndpointPath = import.meta.env.VITE_USERS_ENDPOINT_PATH ?? '/users';

/**
 * Infrastructure service gateway for the IAM bounded-context endpoints.
 *
 * @class IamApi
 * @extends BaseApi
 */
export class IamApi extends BaseApi {
    /**
     * POST /api/v1/authentication/sign-in
     * @param {{username: string, password: string}} credentials
     */
    signIn(credentials) {
        return this.http.post(`${authenticationEndpointPath}/sign-in`, credentials);
    }

    /**
     * POST /api/v1/authentication/sign-up
     * @param {{username: string, password: string}} credentials
     */
    signUp(credentials) {
        return this.http.post(`${authenticationEndpointPath}/sign-up`, credentials);
    }

    /** GET /api/v1/users */
    getUsers() { return this.http.get(usersEndpointPath); }

    /** GET /api/v1/users/{id} */
    getUserById(id) { return this.http.get(`${usersEndpointPath}/${id}`); }
}
