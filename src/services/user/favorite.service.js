import createApiClient from "../api.service";
class FavoriteService {
    constructor(baseUrl = "/api/favorite") {
        this.api = createApiClient(baseUrl);
    }
    async create(id, data) {
        return (await this.api.post(`/add/${id}`, data)).data;
    }
    async getFavorite(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async updateQuantity(id, quantity, data) {
        return (await this.api.put(`/${id}/${quantity}`, data)).data;
    }
    async delete(user, product) {
        return (await this.api.delete(`/${user}/${product}`)).data;
    }
}
export default new FavoriteService();