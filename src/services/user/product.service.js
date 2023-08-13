import createApiClient from "../api.service";
class ProductService {
    constructor(baseUrl = "/api/products") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getType() {
        return (await this.api.get("/type")).data;
    }
    async getListing(url) {
        return (await this.api.get(`/${url}`)).data;
    }
    async getListingAll() {
        return (await this.api.get(`/all`)).data;
    }
    async getDetail(id) {
        return (await this.api.get(`/detail/${id}`)).data;
    }
    async getInventory(product, size) {
        return (await this.api.get(`/get-inventory/product-${product}/size-${size}`)).data;
    }
    
}
export default new ProductService();