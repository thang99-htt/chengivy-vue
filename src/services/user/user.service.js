import createApiClient from "../api.service";
class UserService {
    constructor(baseUrl = "/api/user") {
        this.api = createApiClient(baseUrl);
    }
    async getInfoAccount(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async updateProfile(id, data) {
        return (await this.api.put(`/update-profile/${id}`, data)).data;
    }

    async updatePassword(id, data) {
        return (await this.api.put(`/update-password/${id}`, data)).data;
    }

    async getReviews(id, data) {
        return (await this.api.get(`/reviews/${id}`, data)).data;
    }
    async deleteReview(id) {
        return (await this.api.delete(`/reviews/${id}`)).data;
    }
}
export default new UserService();