import createApiClient from "../api.service";
class PaymentMethodService {
    constructor(baseUrl = "/api/admin/payment-methods") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
}
export default new PaymentMethodService();