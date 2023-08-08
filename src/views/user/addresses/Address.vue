<template>
    <div class="profile-info">
        <div class="liveAlert"></div>
        <h3>Địa chỉ giao hàng</h3>
        <div class="profile-item">
            <h4>Địa chỉ mặc định</h4>
            <hr>
            <div v-for="address in account.delivery_address" :key="address">
                <div v-if="address.default == 1">
                    <p>{{ address.name }}</p>
                    <p>{{ address.phone }}</p>
                    <p>{{ address.address_detail }}</p>
                    <p>{{ address.address }}</p>
                </div>
            </div>
        </div>

        <div class="profile-item">
            <h4>Danh sách địa chỉ</h4>
            <hr>
            <table class="table table-striped table-hover">
                <tbody>
                    <tr v-for="(address) in account.delivery_address" :key="address">
                        <td class="py-4">
                            <div>
                                <span class="acc-name">{{ address.name }}</span>
                                <span>{{ address.phone }}</span>
                            </div>
                            <div>{{ address.address_detail }}</div>
                            <div>{{ address.address }}</div>
                        </td>
                        <td class="text-center">
                            <div class="mt-3">
                                <a class="border-end me-3 pe-3 profile-edit" @click="openModalUpdate(address)">Chỉnh sửa</a>
                                <a class="profile-edit" @click="deleteAddress(address)">Xóa</a>
                            </div>
                            <div class="button">
                                <button class="btn" @click="setDefaultAddress(address)">Thiết lập mặc định</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="button">
                <button class="btn px-4 py-3 fs-4" @click="openModalAdd()">Thêm địa chỉ mới </button>
            </div>
        </div>
    </div>

    <div v-if="modalUpdate">
        <div class="modal d-block address">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title fw-bold">Cập nhật địa chỉ</h4>
                        <button type="button" class="btn-close" @click="modalUpdate = !modalUpdate"></button>
                    </div>
                    <div class="modal-body">
                        <AddressForm :reset="reset" :accountAddress="accountAddress" @submit:accountAddress="updateAddress" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="modalAdd">
        <div class="modal d-block address">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title fw-bold">Thêm địa chỉ mới</h4>
                        <button type="button" class="btn-close" @click="modalAdd = !modalAdd"></button>
                    </div>
                    <div class="modal-body">
                        <AddressForm :reset="reset" :accountAddress="accountAddress" @submit:accountAddress="addAddress" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { showAlert } from '@/utils';
import UserService from "@/services/user/user.service";
import AddressService from "@/services/user/address.service";
import AddressForm from "@/components/user/addresses/AddressForm.vue";

export default {
    components: {
        AddressForm
    },
    data() {
        return {
            token: localStorage.getItem('tokenUser'),
            account: [],
            modalAdd: false,
            modalUpdate: false,
            accountAddress: {},
            accountAddressNew: {
                'name': "",
                'phone': "",
                'address': "",
                'address_detail': "",
            }
        };
    },
    methods: {
        openModalUpdate(address) {
            this.modalUpdate = true;
            this.accountAddress = { ...address };
        },
        openModalAdd() {
            this.modalAdd = true;
            this.accountAddress = this.accountAddressNew;
        },
        async retrieveAccount() {
            try {
                this.account = await UserService.getInfoAccount(this.getUser.id);
            } catch (error) {
                console.log(error);
            }
        },
        async updateAddress(data) {
            try {
                await AddressService.update(data.id, data).then(async (response) => {
                    if (response) {
                        this.reset();
                        this.modalAdd = false;
                        showAlert(response);
                        this.retrieveAccount();
                    }
                    this.modalUpdate = false;
                });
            } catch (error) {
                console.log(error);
            }
        },
        async addAddress(data) {
            try {
                await AddressService.create(this.getUser.id, data).then((response) => {
                    this.reset();
                    showAlert(response);
                    this.retrieveAccount();
                    this.modalAdd = false;
                });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteAddress(address) {
            try {
                await AddressService.delete(address.id).then((response) => {
                    showAlert(response);
                    this.retrieveAccount();
                });
            } catch (error) {
                console.log(error);
            }
        },
        async setDefaultAddress(address) {
            try {
                await AddressService.setDefault(address.id).then((response) => {
                    showAlert(response);
                    this.retrieveAccount();
                });
            } catch (error) {
                console.log(error);
            }
        },
        reset() {
            this.accountAddressNew.name = "";
            this.accountAddressNew.phone = "";
            this.accountAddressNew.address = "";
        },
    },
    mounted() {
        this.retrieveAccount();
    },
    computed: {
        ...mapGetters(['getUser']),
    }
};
</script>