import createApiClient from "../api.service";
class AddressService {
    constructor(baseUrl = "/api/addresses") {
        this.api = createApiClient(baseUrl);
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getAllAdress(id) {
        return (await this.api.get(`/getAll/${id}`)).data;
    }
    async getCities() {
        return (await this.api.get(`/cities`)).data;
    }
    async getDistricts(id) {
        return (await this.api.get(`/get-districts/${id}`)).data;
    }
    async getWards(id) {
        return (await this.api.get(`/get-wards/${id}`)).data;
    }
    async getAddressOrder(id) {
        return (await this.api.get(`/address-order/${id}`)).data;
    }
    async create(id, data) {
        return (await this.api.post(`/address-add/${id}`, data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async setDefault(id, data) {
        return (await this.api.put(`/set-default/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new AddressService();