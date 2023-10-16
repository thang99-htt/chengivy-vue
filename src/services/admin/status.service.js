import createApiClient from "../api.service";
class StatusService {
    constructor(baseUrl = "/api/admin/statuses") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
}
export default new StatusService();