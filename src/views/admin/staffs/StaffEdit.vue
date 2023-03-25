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
                        <h3 class="box-title">Hiệu chỉnh Nhân viên</h3>
                    </div>
                    
                    <div class="box-body offset-3 col-6">
                        <StaffForm
                            :staff="staff"
                            @submit:staff="updateStaff"
                            @delete:staff="deleteStaff"
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
                staff: null,
            };
        },
        methods: {
            async getStaff(id) {
                try {
                    this.staff = await StaffService.get(id);
                } catch (error) {
                    console.log(error);
                    // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                    this.$router.push({
                        name: "notfound",
                        params: {
                            pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },
            async updateStaff(data) {
                try {
                    await StaffService.update(this.staff.id, data);
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Nhân viên được cập nhật thành công.'
                    })

                    this.$router.push({ name: "staff" });
                } catch (error) {
                    console.log(error);
                }
            },
            async deleteStaff() {
                if (confirm("Bạn muốn xóa Nhân viên này?")) {
                    try {
                        await StaffService.delete(this.staff.id);
                        this.$router.push({ name: "staff" });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        created() {
            this.getStaff(this.id);
        },
    };
</script>
