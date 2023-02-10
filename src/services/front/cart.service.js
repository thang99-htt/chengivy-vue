import createApiClient from "../api.service";
class ProductService {
    constructor(baseUrl = "/api/cart") {
        this.api = createApiClient(baseUrl);
    }
    async create(id, data) {
        return (await this.api.post(`/add/${id}`, data)).data;
    }
    async getCart(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async updateQuantity(id, quantity, data) {
        return (await this.api.put(`/${id}/${quantity}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new ProductService();