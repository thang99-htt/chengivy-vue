<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="role" class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">Thêm mới Vai trò</h3>
                    </div>
                    
                    <div class="box-body">
                        <RoleForm
                        :role="role"
                        @submit:role="createRole"
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
                role: {
                    'name': "",
                    'description': "",
                },
            };
        },
        methods: {
            async createRole(data) {
                try {
                    await RoleService.create(data);
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
                        title: 'Vai trò được thêm thành công.'
                    })
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>
