import createApiClient from "../api.service";
class OrderService {
    constructor(baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(id, data) {
        return (await this.api.post(`/add/${id}`, data)).data;
    }
    async addBuyNow(id, data) {
        return (await this.api.post(`/add-buy-now/${id}`, data)).data;
    }
    async getAllPurchase(id) {
        return (await this.api.get(`purchases/user-${id}`)).data;
    }
    async getPurchase(id) {
        return (await this.api.get(`purchase/order-${id}`)).data;
    }
    async cancelOrder(id, data) {
        return (await this.api.put(`purchase/cancel-${id}`, data)).data;
    }
    async receiptOrder(id, data) {
        return (await this.api.put(`purchase/receipt-${id}`, data)).data;
    }
}
export default new OrderService();