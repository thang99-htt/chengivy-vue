import createApiClient from "../api.service";
class StockReceivedDocketService {
    constructor(baseUrl = "/api/admin/import/stock-received-docket") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async create(id, data) {
        return (await this.api.post(`/add/${id}`, data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new StockReceivedDocketService();