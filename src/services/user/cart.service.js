import createApiClient from "../api.service";
class CartService {
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
        return (await this.api.put(`/quantity/${id}/${quantity}`, data)).data;
    }
    async updateSize(id, size, quantity, data) {
        return (await this.api.put(`/size/${id}/${size}/${quantity}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new CartService();