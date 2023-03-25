import createApiClient from "../api.service";
class AddressService {
    constructor(baseUrl = "/api/addresses") {
        this.api = createApiClient(baseUrl);
    }
    async getAddresses(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getCities() {
        return (await this.api.get(`/cities`)).data;
    }
    async getAddressOrder(id) {
        return (await this.api.get(`/address-order/${id}`)).data;
    }
    async createNewAddress(id, data) {
        return (await this.api.post(`/address-add/${id}`, data)).data;
    }
}
export default new AddressService();