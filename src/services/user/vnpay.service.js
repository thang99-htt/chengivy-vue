import createApiClient from "../api.service";
class VNPayService {
    constructor(baseUrl = "/api/vnpay") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post(`/create-payment`, data)).data;
    }
}
export default new VNPayService();