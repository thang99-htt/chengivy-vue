import createApiClient from "../api.service";
class NotificationService {
    constructor(baseUrl = "/api/admin/notifications") {
        this.api = createApiClient(baseUrl);
    }
    async createReview(id, data) {
        return (await this.api.post(`/reviews/${id}`, data)).data;
    }
}
export default new NotificationService();