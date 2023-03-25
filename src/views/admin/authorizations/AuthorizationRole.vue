<template>
    <h5 class="my-3">Phân theo vai trò</h5>
    <table
        aria-describedby="example2_info" role="grid" 
        id="" class="table_role example2 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example2" tabindex="0" class="sorting_asc">#</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example2" tabindex="0" class="sorting">Vai trò</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example2" tabindex="0" class="sorting">Quyền</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example2" tabindex="0" class="sorting">Nhân viên</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example2" tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(role, index) in roles"
            :key="role"
        >
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{ role.description }}</td>
            <td>
                <div v-for="permisison in role.permissions" class="btn-permission">
                    {{ permisison.description }}
                </div>    
            </td>
            <td>
                <div v-for="staff in role.staffs" class="btn-staff">
                    {{ staff.name }}
                </div>    
            </td>
            <td>
                <button
                    v-if="role.permissions.length == 0"
                    type="button"
                    class="ms-2 btn btn-primary"
                    @click="openModel(role.id)"
                >
                    <i class="fas fa-user-plus"></i>
                </button>
                <button
                    v-else
                    type="button"
                    class="ms-2 btn btn-warning"
                    @click="openModelEidt(role.id)"
                >
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
      </tbody>
    </table>

    <div v-if="myModel">
        <div class="modal d-block">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateAddressModalLabel">Phân quyền cho vai trò</h5>
                        <button type="button" class="btn-close" @click="closeModel"></button>
                    </div>
                    <div class="modal-body col-8 m-auto">
                        <PermissionRoleForm
                            :role="role"
                            :permissionRole="permissionRole"
                            @submit:permissionRole="createPermissionByRole"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import AuthorizationService from "@/services/admin/authorization.service";
    import PermissionRoleForm from "@/components/admin/authorizations/PermissionRoleForm.vue";    
    import 'datatables.net'
    import 'datatables.net-bs'
    
    export default {
        components: {
            PermissionRoleForm
        },
        data() {
            return {
                myModel: false,
                myModelEdit: false,
                roles: [],
                role: null,
                permissionRole: {
                    'role_id': "",
                    'permission_id': [],
                    'staff_id': [],
                },
            };
        },
        mounted() {
            AuthorizationService.getByRole().then((response) => {
                this.roles = response;
                this.$nextTick(() => {
                    $('.example2').DataTable()
                })
            });
        },
        beforeUpdate() {
            AuthorizationService.getByRole().then((response) => {
                this.roles = response;
                this.$nextTick(() => {
                    $('.example2').DataTable()
                })
            });
        },
        methods: {
            async openModel(id) {
                await AuthorizationService.getPermissionRole(id).then((response) => {
                    this.role = response;
                    this.permissionRole.role_id = response.id;
                    response.staffs.forEach(index=>{
                        this.permissionRole.staff_id.push(index.name);
                    })
                });
                this.myModel = true;
            },
            async openModelEidt(id) {
                await AuthorizationService.getPermissionRole(id).then((response) => {
                    this.role = response;
                    this.permissionRole.role_id = response.id;
                    response.staffs.forEach(index=>{
                        this.permissionRole.staff_id.push(index.id);
                    })
                    response.permissions.forEach(index=>{
                        this.permissionRole.permission_id.push(index.id);
                    })
                });
                
                this.myModel = true;
            },
            closeModel() {
                this.myModel = false;
            },
            async retrieveRoles() {
                try {
                    this.roles= await AuthorizationService.getByRole();
                    this.$nextTick(() => {
                        $('.example2').DataTable()
                    })
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveRoles();
            },
            reset () {
                this.permissionRole.role_id = "";
                this.permissionRole.permission_id = [];
                this.permissionRole.staff_id = [];
            },
            async createPermissionByRole(data) {
                try {    
                    await AuthorizationService.createPermissionRole(data).then((response) => {
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
                            title: 'Phân quyền cho vai trò thành công.'
                        })

                    })

                    this.myModel = false;
                    this.refreshList();
                    this.reset();

                } catch (error) {
                    console.log(error);
                }
            },
        },
        
    };
</script>

<style>
    @import url('/static/js/plugins/datatables/dataTables.bootstrap.css');
    @import url('/static/css/bootstrap.min.css');

    .btn-permission {
        width: 140px;
        color: #000;
        background-color: #1ed085;
        margin: 6px 10px 6px 0;
        border-radius: 4px;
        display: inline-block;
        padding: 4px;
    }

    table.table_role thead > tr > th:nth-child(3) {
        width: 400px !important;
    }
</style>
