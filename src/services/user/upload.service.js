import createApiClient from "../api.service";
class UploadService {
    constructor(baseUrl = "/api/upload-image") {
        this.api = createApiClient(baseUrl);
    }
    async upload(data) {
        return (await this.api.post('/', data)).data;
    }
}
export default new UploadService();