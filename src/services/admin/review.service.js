import createApiClient from "../api.service";
class ReviewService {
    constructor(baseUrl = "/api/admin/reviews") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async updateStatus(id, status, data) {
        return (await this.api.put(`/${id}/${status}`, data)).data;
    }
}
export default new ReviewService();