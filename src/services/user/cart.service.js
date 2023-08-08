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
    async updateQuantity(data) {
        return (await this.api.put(`/quantity`, data)).data;
    }
    async updateColorAndSize(data) {
        return (await this.api.put(`/size-and-color`, data)).data;
    }
    async delete(user, product, color, size) {
        return (await this.api.delete(`/${user}/${product}/${color}/${size}`)).data;
    }
}
export default new CartService();