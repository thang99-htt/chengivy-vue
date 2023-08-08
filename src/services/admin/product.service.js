import createApiClient from "../api.service";
class ProductService {
    constructor(baseUrl = "/api/admin/products") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
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
    async view(id) {
        return (await this.api.get(`/view/${id}`)).data;
    }
    async createImage(data) {
        return (await this.api.post(`/add-image`, data)).data;
    }
    async createSize(data) {
        return (await this.api.post(`/add-size`, data)).data;
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
    async deleteImage(id) {
        return (await this.api.delete(`/delete-image/${id}`)).data;
    }
    async deleteSize(id) {
        return (await this.api.delete(`/delete-size/${id}`)).data;
    }
    async getSizeAll() {
        return (await this.api.get("/sizes")).data;
    }
    async getBrandAll() {
        return (await this.api.get("/brands")).data;
    }
    async getColorAll() {
        return (await this.api.get("/colors")).data;
    }
}
export default new ProductService();