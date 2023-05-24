<template>
    <div class="container profiles">
        <div class="ms-3">
            <div class="box-header with-border p-0 mb-4">
                <h3>Hồ sơ tài khoản</h3>
            </div>
            <h5 class="name">{{ account.name }}</h5>
            <p class="text-dark">Khách hàng thành viên</p>
            <p class="mt-2 mb-2">Mua sắm nhiều hơn để có được mức thành viên cao hơn.</p>
            
            <div class="accordion mt-4" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Thông tin tài khoản
                        </button>
                    </h2>
                    <hr>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body">
                            <p class="m-0">{{ account.name }}</p>
                            <p>{{ account.email }}</p>
                            <p>
                                <span class="pe-3 border-end">
                                    <a class="text-danger" @click="openModalUpdate">
                                        Cập nhật
                                    </a>
                                </span> 
                                <span class="ps-2 pe-3 border-end">
                                    <a class="text-danger" @click="openModalPassword">Thay đổi mật khẩu</a>
                                </span>
                                <span class="ps-2"><a href="/" class="text-danger">Thay đổi email</a></span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Địa chỉ giao hàng
                        </button>
                    </h2>
                    <hr>
                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree">
                        <div class="accordion-body">
                            <table class="table table-striped table-hover mt-3">
                                <tbody>
                                    <tr 
                                        v-for="(acc) in account.contacts"
                                        :key="acc.id"
                                    >
                                        <td class="py-4">
                                            <div>
                                                <span class="fs-6 fw-bold acc-name">{{ acc.name }}</span>
                                                <span>{{ acc.phone }}</span>
                                            </div>
                                            <div>
                                                {{ acc.address }}
                                            </div>
                                            <div>
                                                {{ acc.ward }}, {{ acc.district }}, {{ acc.city }}
                                            </div>
                                        </td>
                                        <td>
                                            <div class="mt-3">
                                                Cập nhật Xóa
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="modalUpdate">
        <div class="modal d-block">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateAddressModalLabel">Cập nhật Hồ Sơ</h5>
                        <button type="button" class="btn-close" @click="closeModalUpdate"></button>
                    </div>
                    <div class="modal-body">
                        <ProfileForm 
                            :profile="account.profiles"
                            @submit:profile="updateProfile"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="modalPassword">
        <div class="modal d-block">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateAddressModalLabel">Thay đổi Mật khẩu</h5>
                        <button type="button" class="btn-close"  @click="closeModalPassword"></button>
                    </div>
                    <div class="modal-body">
                        <PasswordForm 
                            :accountPassword="accountPassword"
                            @submit:accountPassword="updatePassword"
                        />
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
    import {mapGetters} from 'vuex';

    export default {
        components: {
            ProfileForm,
            PasswordForm
        },
        data() {
            return {
                account: [],
                modalUpdate: false,
                modalPassword: false,
                profile: {
                    'name': "",
                    'phone': "",
                    'gender': "",
                    'birth_date': "",
                    'account_number': "",
                },
                accountPassword: {
                    'password': "",
                    'new_password': "",
                    'confirm_password': ""
                }
            };
        },
        methods: {
            openModalUpdate() {
                this.modalUpdate = true;
            },
            closeModalUpdate() {
                this.modalUpdate = false;
            },
            openModalPassword() {
                this.modalPassword = true;
            },
            closeModalPassword() {
                this.modalPassword = false;
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
                    await UserService.updateProfile(this.getUser.id, data).then(async(response) => {
                        const Toast = this.$swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                            }
                        })

                        if(response) {
                            Toast.fire({
                                icon: 'success',
                                title: 'Hồ sơ được cập nhật thành công.'
                            })

                            this.account = await UserService.getInfoAccount(this.getUser.id);
                            
                        } 
                        
                        this.modalUpdate = false;
    
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
<style scoped> 
    .accordion-item {
        border: none !important;
    }
    .accordion-button {
        font-weight: 600 !important;
        font-size: 20px;
    }

    .acc-name {
        border-right: 1px solid #a4a4a4;
        padding-right: 8px;
        margin-right: 4px;
    }

    a {
        cursor: pointer;
    }
</style>