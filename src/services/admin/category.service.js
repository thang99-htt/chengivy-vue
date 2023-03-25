import createApiClient from "../api.service";
class CategoryService {
    constructor(baseUrl = "/api/admin/categories") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getCategory() {
        return (await this.api.get("/category")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async getAdd(data) {
        return (await this.api.get("/add", data)).data;
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
    async updateStatus(id, status, data) {
        return (await this.api.put(`/${id}/${status}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new CategoryService();