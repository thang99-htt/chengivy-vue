<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold" v-if="roleID">Cập nhật vai trò</h4>
                    <h4 class="modal-title fw-bold" v-else>Thêm mới vai trò</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div v-if="role" class="box box-info">
                        <div class="box-body">
                            <RoleForm :role="role" @submit:role="submitRole" :reset="reset"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import RoleForm from "./RoleForm.vue";
import RoleService from "@/services/admin/role.service";

export default {
    props: {
        modalRole: { type: Boolean, required: true },
        roleID: { type: Number, required: true },
    },
    components: {
        RoleForm,
    },
    data() {
        return {
            role: {
                'name': "",
                'description': "",
                'permission_id': []
            },
        };
    },
    methods: {
        async getRole() {
            if (this.roleID) {
                await RoleService.get(this.roleID).then((response) => {
                    this.role = response;
                    this.role.permission_id = [];
                    response.permissions.forEach(index=>{
                        this.role.permission_id.push(index.id);
                    })
                });
            }
        },
        async submitRole(data) {
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
            if (this.roleID) {
                try {
                    await RoleService.update(this.role.id, data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Vai trò được cập nhật thành công.'
                    });
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await RoleService.create(data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Vai trò được thêm thành công.'
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            this.reset();
            this.$parent.refreshList();
            this.closeModal();
        },
        closeModal() {
            this.$emit('closeModal');
        },
        reset () {
            this.role.name = "";
            this.role.description = "";
            this.role.permission_id = [];
        },
    },
    mounted() {
        this.getRole();
    },
};
</script>
