import createApiClient from "../api.service";
class StatisticalService {
    constructor(baseUrl = "/api/admin/statisticals") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }

    async getRangeDate(data) {
        return (await this.api.get("/get-range-date", data)).data;
    }

    async getOrders(data) {
        return (await this.api.post("/get-orders", data)).data;
    }

    async getSales(data) {
        return (await this.api.post("/get-sales", data)).data;
    }

    async getProducts(data) {
        return (await this.api.post("/get-products", data)).data;
    }

    async getProductsSoldOut(data) {
        return (await this.api.post("/get-products-sold-out", data)).data;
    }

    async getTopProducts(data) {
        return (await this.api.get("/get-top-products", data)).data;
    }

    async getInventories(data) {
        return (await this.api.get("/get-inventories", data)).data;
    }

    async getNotifications() {
        return (await this.api.get("/get-notification")).data;
    }
}
export default new StatisticalService();