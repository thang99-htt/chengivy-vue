import createApiClient from "../api.service";
class OrderService {
    constructor(baseUrl = "/api/admin/orders") {
        this.api = createApiClient(baseUrl);
    }
    async getAll(data) {
        return (await this.api.post("/", data)).data;
    }
    async soldAtStore(data) {
        return (await this.api.post("sold-at-store", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getAllShippers() {
        return (await this.api.get("get-shippers")).data;
    }
    async getOrdersByShipper(data) {
        return (await this.api.post("/order-by-shipper", data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async updateStatus(data) {
        return (await this.api.put(`/update-status`, data)).data;
    }
    async deliveryOrder(data) {
        return (await this.api.put(`/delivery-order`, data)).data;
    }
    async asignmentShipper(data) {
        return (await this.api.put(`/assignment-shipper`, data)).data;
    }
    async cancelOrder(selectedIds) {
        return (await this.api.put("/cancel", { data: selectedIds })).data;
    }

}
export default new OrderService();