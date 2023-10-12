import createApiClient from "../api.service";
class ReturnService {
    constructor(baseUrl = "/api/admin/returns") {
        this.api = createApiClient(baseUrl);
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getAll(data) {
        return (await this.api.post("/all", data)).data;
    }
    async updateStatus(data) {
        return (await this.api.put(`/update-status`, data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async hidden(selectedIds) {
        return (await this.api.put("/hidden", { data: selectedIds })).data;
    }
}
export default new ReturnService();