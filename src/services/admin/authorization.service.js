import createApiClient from "../api.service";
class AuthorizationService {
    constructor(baseUrl = "/api/admin/authorization") {
        this.api = createApiClient(baseUrl);
    }
    async getByRole() {
        return (await this.api.get("/by-role")).data;
    }
    async getByStaff() {
        return (await this.api.get("/by-staff")).data;
    }
    async getRoleStaff(id) {
        return (await this.api.get(`/role-staff/${id}`)).data;
    }
    async createRoleStaff(data) {
        return (await this.api.post("/role-staff", data)).data;
    }
    async getPermissionRole(id) {
        return (await this.api.get(`/permission-role/${id}`)).data;
    }
    async createPermissionRole(data) {
        return (await this.api.post("/permission-role", data)).data;
    }
}
export default new AuthorizationService();