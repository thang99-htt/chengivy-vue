import createApiClient from "../api.service";
class LoginService {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("/login", data)).data;
    }
    async destroy(id) {
        return (await this.api.post(`/logout`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new LoginService();