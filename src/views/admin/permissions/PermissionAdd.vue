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
                        <PermisssionForm
                            :permission="permission"
                            @submit:permission="createPermission"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import PermisssionForm from "@/components/admin/permissions/PermissionForm.vue";
    import PermissionService from "@/services/admin/permission.service";

    export default {
        components: {
            PermisssionForm,
        },
        data() {
            return {
                permission: {
                    'name': "",
                    'description': "",
                },
            };
        },
        methods: {
            async createPermission(data) {
                try {
                    await PermissionService.create(data);
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
                        title: 'Quyền được thêm thành công.'
                    })
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>
