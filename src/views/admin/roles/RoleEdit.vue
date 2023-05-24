<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="role" class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">Hiệu chỉnh Vai trò</h3>
                    </div>
                    
                    <div class="box-body">
                        <RoleForm
                            :role="role"
                            @submit:role="updateRole"
                            @delete:role="deleteRole"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import RoleForm from "@/components/admin/roles/RoleForm.vue";
    import RoleService from "@/services/admin/role.service";
    export default {
        components: {
            RoleForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                role: null,
            };
        },
        methods: {
            async getRole(id) {
                try {
                    this.role = await RoleService.get(id);
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
            async updateRole(data) {
                try {
                    await RoleService.update(this.role.id, data);
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
                        title: 'Vai trò được cập nhật thành công.'
                    })
                    // toastr.info('Are you the 6 fingered man?');
                } catch (error) {
                    console.log(error);
                }
            },
            async deleteRole() {
                if (confirm("Bạn muốn xóa Vai trò này?")) {
                    try {
                        await RoleService.delete(this.role.id);
                        this.$router.push({ name: "role" });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        created() {
            this.getRole(this.id);
        },
    };
</script>
