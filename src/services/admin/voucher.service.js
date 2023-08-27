import createApiClient from "../api.service";
class VoucherService {
    constructor(baseUrl = "/api/admin/vouchers") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getByUser(id) {
        return (await this.api.get(`/voucher-by-user-${id}`)).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async updateStatus(id, status, data) {
        return (await this.api.put(`/${id}/${status}`, data)).data;
    }
    async delete(selectedIds) {
        return (await this.api.delete("/", { data: selectedIds })).data;
    }
}
export default new VoucherService();