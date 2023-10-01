<template>
    <div class="profile-info">
        <div class="liveAlert"></div>
        <h3>Yêu cầu Trả hàng / Hoàn tiền</h3>
        <div class="profile-item">
            <h4 class="text-white">aaaaaaa</h4>
            <hr>
            <h3 class="name">Sản phẩm cần hoàn trả</h3>
            <p class="rating">Hạng thành viên:
                <span>MEMBER</span>
            </p>
            <p>Mua sắm nhiều hơn để có được mức thành viên cao hơn.</p>
        </div>

        <div class="profile-item">
            <hr>
            <h3>Lý do Trả hàng và Hoàn tiền?</h3>
            <p>{{ account.name }}</p>
            <p>{{ account.email }}</p>
            <p>{{ account.phone }}</p>
            <p>{{ account.gender }}</p>
            <p>
                <span class="pe-3 border-end">
                    <a class="text-danger" @click="openModalProfile(account)">
                        Chỉnh sửa
                    </a>
                </span>
                <span class="ps-2 pe-3">
                    <a class="text-danger" @click="modalPassword = !modalPassword">Thay đổi mật khẩu</a>
                </span>
            </p>
        </div>
    </div>
    <div v-if="modalUpdate">
        <div class="modal d-block">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title fw-bold">Cập nhật hồ sơ</h4>
                        <button type="button" class="btn-close" @click="modalUpdate = !modalUpdate"></button>
                    </div>
                    <div class="modal-body">
                        <ProfileForm :accountProfile="accountProfile" @submit:accountProfile="updateProfile" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="modalPassword">
        <div class="modal d-block">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="modal-title fw-bold fs-4">Thay đổi mật khẩu</p>
                        <button type="button" class="btn-close" @click="modalPassword = ! modalPassword"></button>
                    </div>
                    <div class="modal-body">
                        <PasswordForm :accountPassword="accountPassword" @submit:accountPassword="updatePassword" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UserService from "@/services/user/user.service";
import ProfileForm from "@/components/user/profiles/ProfileForm.vue";
import PasswordForm from "@/components/user/profiles/PasswordForm.vue";
import { mapGetters } from 'vuex';
import axios from 'axios';
import { showAlert } from '@/utils';

export default {
    components: {
        ProfileForm,
        PasswordForm
    },
    data() {
        return {
            token: localStorage.getItem('tokenUser'),
            account: [],
            modalUpdate: false,
            modalPassword: false,
            accountProfile: {},
            accountPassword: {
                'password': "",
                'new_password': "",
                'confirm_password': ""
            }
        };
    },
    methods: {
        openModalProfile(account) {
            this.modalUpdate = true;
            this.accountProfile = {...account};
        },
        async retrieveAccount() {
            try {
                this.account = await UserService.getInfoAccount(this.getUser.id);
            } catch (error) {
                console.log(error);
            }
        },
        async updateProfile(data) {
            try {
                await UserService.updateProfile(this.getUser.id, data).then(async (response) => {
                    if (response.success == 'success') {
                        showAlert(response);
                        this.retrieveAccount();
                    }
                    this.modalUpdate = false;
                });
            } catch (error) {
                console.log(error);
            }
        },
        async updatePassword(data) {
            try {
                await UserService.updatePassword(this.getUser.id, data).then(async (response) => {
                    try {
                        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
                        await axios.post(`http://127.0.0.1:8000/api/logout`).then((res) => {
                            localStorage.removeItem('tokenUser');
                            this.$store.dispatch('logoutUser');
                            this.$router.push({ name: "login" });
                        });
                    } catch (error) {
                        console.log(error);
                    }
                    showAlert(response);
                    this.modalPassword = false;
                });
            } catch (error) {
                console.log(error);
            }
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