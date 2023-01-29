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
    import RoleForm from "@/components/back/roles/RoleForm.vue";
    import RoleService from "@/services/back/role.service";
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
            async createRole(data) {
                try {
                    await RoleService.create(data);
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
                        title: 'Vai trò được thêm thành công.'
                    })
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>
