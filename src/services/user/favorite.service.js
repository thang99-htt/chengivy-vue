import createApiClient from "../api.service";
class FavoriteService {
    constructor(baseUrl = "/api/favorite") {
        this.api = createApiClient(baseUrl);
    }
    async create(id, data) {
        return (await this.api.post(`/add/${id}`, data)).data;
    }    
    async addToCart(id, data) {
        return (await this.api.post(`/add-to-cart/${id}`, data)).data;
    }
    async getFavorite(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async updateQuantity(id, quantity, data) {
        return (await this.api.put(`/${id}/${quantity}`, data)).data;
    }
    async deleteByUser(user, product) {
        return (await this.api.delete(`/delete-by-user/${user}/${product}`)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new FavoriteService();