import createApiClient from "../api.service";
class CategoryService {
    constructor(baseUrl = "/api/categories") {
        this.api = createApiClient(baseUrl);
    }
    async getCategory() {
        return (await this.api.get("/category")).data;
    }
}
export default new CategoryService();