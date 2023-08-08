<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="permission" class="box box-info">
                    <div class="box-header with-border">
                        <router-link to="/admin/permissions">
                            <input type="button" name="btnBack" value="Trở về">
                        </router-link>
                    </div>
                    
                    <div class="box-body offset-3 col-6">
                        <PermissionForm
                            :permission="permission"
                            @submit:permission="updatePermission"
                            @delete:permission="deletePermission"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import PermissionForm from "@/components/admin/permissions/PermissionForm.vue";
    import PermissionService from "@/services/admin/permission.service";
    export default {
        components: {
            PermissionForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                permission: null,
            };
        },
        methods: {
            async getPermission(id) {
                try {
                    this.permission = await PermissionService.get(id);
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
            async updatePermission(data) {
                try {
                    await PermissionService.update(this.permission.id, data);
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
                        title: 'Quyền được cập nhật thành công.'
                    })
                    // toastr.info('Are you the 6 fingered man?');
                } catch (error) {
                    console.log(error);
                }
            },
            async deletePermission() {
                if (confirm("Bạn muốn xóa Quyền này?")) {
                    try {
                        await PermissionService.delete(this.permission.id);
                        this.$router.push({ name: "permission" });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        created() {
            this.getPermission(this.id);
        },
    };
</script>
