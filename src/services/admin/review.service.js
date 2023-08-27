import createApiClient from "../api.service";
class ReviewService {
    constructor(baseUrl = "/api/admin/reviews") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async updateStatus(id, data) {
        return (await this.api.put(`/user-${id}`, data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
}
export default new ReviewService();