import createApiClient from "../api.service";
class ProductService {
    constructor(baseUrl = "/api/cart") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("/add", data)).data;
    }
    async getCart() {
        return (await this.api.get("/")).data;
    }
}
export default new ProductService();