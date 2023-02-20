import createApiClient from "../api.service";
class CartService {
    constructor(baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl);
    }
    async create(id, data) {
        return (await this.api.post(`/add/${id}`, data)).data;
    }
}
export default new CartService();