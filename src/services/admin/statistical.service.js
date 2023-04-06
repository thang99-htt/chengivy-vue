import createApiClient from "../api.service";
class StatisticalService {
    constructor(baseUrl = "/api/admin/statisticals") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
}
export default new StatisticalService();