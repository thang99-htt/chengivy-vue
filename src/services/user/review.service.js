import createApiClient from "../api.service";
class ReviewService {
    constructor(baseUrl = "/api/reviews") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post(`/add`, data)).data;
    }
}
export default new ReviewService();