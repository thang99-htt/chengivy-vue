import createApiClient from "../api.service";
class InvoiceService {
    constructor(baseUrl = "/api/admin/invoices") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
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
    async updateStatus(staff, id, status, data) {
        return (await this.api.put(`/${staff}/${id}/${status}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new InvoiceService();