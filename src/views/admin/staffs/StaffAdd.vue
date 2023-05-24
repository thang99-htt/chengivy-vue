<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="staff" class="box box-info">
                    <div class="box-header with-border">
                        <router-link to="/admin/staffs">
                            <button
                                type="button"
                                class="btn btn-dark me-4"
                            >
                                <i class="fa fa-arrow-left"></i>
                            </button>
                        </router-link>
                        <h3 class="box-title">Thêm mới Nhân viên</h3>
                    </div>
                    
                    <div class="box-body offset-3 col-6">
                        <StaffForm
                        :staff="staff"
                        @submit:staff="createStaff"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import StaffForm from "@/components/admin/staffs/StaffForm.vue";
    import StaffService from "@/services/admin/staff.service";
    export default {
        components: {
            StaffForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                staff: {
                    'name': "",
                    'identity_card': "",
                    'email': "",
                    'phone': "",
                    'gender': "",
                    'birth_date': "",
                    'address': "",
                },
            };
        },
        methods: {
            async createStaff(data) {
                try {
                    await StaffService.create(data);
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

                    Toast.fire({
                        icon: 'success',
                        title: 'Nhân viên được thêm thành công.'
                    })
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>
