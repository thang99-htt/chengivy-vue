import createApiClient from "../api.service";
class AddressService {
    constructor(baseUrl = "/api/addresses") {
        this.api = createApiClient(baseUrl);
    }
    async getAddresses(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getAddressOrder(id) {
        return (await this.api.get(`/address-order/${id}`)).data;
    }
}
export default new AddressService();