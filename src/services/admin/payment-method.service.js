import createApiClient from "../api.service";
class PaymentVoucherService {
    constructor(baseUrl = "/api/admin/payment-methods") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
}
export default new PaymentVoucherService();