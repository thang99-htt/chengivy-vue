<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold" v-if="staffID">Cập nhật nhân viên</h4>
                    <h4 class="modal-title fw-bold" v-else>Thêm mới nhân viên</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div v-if="staff" class="box box-info">
                        <div class="box-body">
                            <StaffForm :staff="staff" @submit:staff="submitStaff" :reset="reset"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import StaffForm from "./StaffForm.vue";
import StaffService from "@/services/admin/staff.service";

export default {
    props: {
        modalStaff: { type: Boolean, required: true },
        staffID: { type: Number, required: true },
    },
    components: {
        StaffForm,
    },
    data() {
        return {
            staff: {
                'name': "",
                'identity_card': "",
                'email': "",
                'phone': "",
                'gender': "Nam",
                'birth_date': "1995-01-01",
                'address': "",
                'address_detail': "",
                'password': "",
                'role_id': [],
            },
        };
    },
    methods: {
        async getStaff() {
            if (this.staffID) {
                await StaffService.get(this.staffID).then((response) => {
                    this.staff = response;
                    this.staff.role_id = [];
                    response.roles.forEach(index => {
                        this.staff.role_id.push(index.id)
                    })
                });
            }
        },
        async submitStaff(data) {
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
            if (this.staffID) {
                try {
                    await StaffService.update(this.staff.id, data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Nhân viên được cập nhật thành công.'
                    });
                    this.$parent.refreshList();
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    this.staff.password = this.generateRandomPassword();
                    await StaffService.create(data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Nhân viên được thêm thành công.'
                    });
                    this.reset();
                    this.$parent.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        generateRandomPassword() {
            const length = 8;
            const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
            let password = "";
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            return password;
        },
        closeModal() {
            // this.resetForm();
            this.$emit('closeModal');
        },
        reset () {
            this.staff.name = "";
            this.staff.identity_card = "";
            this.staff.email = "";
            this.staff.phone = "";
            this.staff.gender = "Nam";
            this.staff.birth_date = "1995-01-01";
            this.staff.address = "";
            this.staff.address_detail = "";
            this.staff.password = "";
            this.staff.role_id = [];
        },
    },
    mounted() {
        this.getStaff();
    },
};
</script>
