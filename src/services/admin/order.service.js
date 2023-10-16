import createApiClient from "../api.service";
class OrderService {
    constructor(baseUrl = "/api/admin/orders") {
        this.api = createApiClient(baseUrl);
    }
    async getAll(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async updateStatus(data) {
        return (await this.api.put(`/update-status`, data)).data;
    }
    async cancelOrder(selectedIds) {
        return (await this.api.put("/cancel", { data: selectedIds })).data;
    }

}
export default new OrderService();