import createApiClient from "../api.service";
class ReturnService {
    constructor(baseUrl = "/api/returns") {
        this.api = createApiClient(baseUrl);
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getAll(data) {
        return (await this.api.get("/", data)).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async cancelReturn(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
}
export default new ReturnService();