<template>
    <h3 class="my-3">Phân theo nhân viên</h3>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class="example1 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">#</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Nhân viên</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Vai trò</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(staff, index) in staffs"
            :key="staff"
        >
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{ staff.name }}</td>
            <td>
                <div v-for="role in staff.roles" class="btn-staff">
                    {{ role.description }}
                </div>    
            </td>
            <td>
                <button
                    v-if="staff.roles.length == 0"
                    type="button"
                    class="ms-2 btn btn-primary"
                    @click="openModel(staff.id)"
                >
                    <i class="fas fa-user-plus"></i>
                </button>
                <button
                    v-else
                    type="button"
                    class="ms-2 btn btn-warning"
                    @click="openModelEidt(staff.id)"
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
                        <h5 class="modal-title" id="updateAddressModalLabel">Phân vai trò cho nhân viên</h5>
                        <button type="button" class="btn-close" @click="closeModel"></button>
                    </div>
                    <div class="modal-body ofset-3 col-6 m-auto">
                        <StaffRoleForm
                            :staff="staff"
                            :roleStaff="roleStaff"
                            @submit:roleStaff="createRoleByStaff"
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
    import StaffRoleForm from "@/components/admin/authorizations/StaffRoleForm.vue";    
    import 'datatables.net'
    import 'datatables.net-bs'
    
    export default {
        components: {
            StaffRoleForm
        },
        props: {
            staffs: { type: Array, default: [] },
        },
        mounted() {
            AuthorizationService.getByStaff().then((response) => {
                this.staffs = response;
                this.$nextTick(() => {
                    $('.example1').DataTable()
                })
            });
        },
        data() {
            return {
                myModel: false,
                myModelEdit: false,
                staffs: [],
                staff: null,
                roleStaff: {
                    'staff_id': "",
                    'role_id': [],
                },
            };
        },
        methods: {
            async openModel(id) {
                await AuthorizationService.getRoleStaff(id).then((response) => {
                    this.staff = response;
                    this.roleStaff.staff_id = response.id;
                });
                this.myModel = true;
            },
            async openModelEidt(id) {
                await AuthorizationService.getRoleStaff(id).then((response) => {
                    this.staff = response;
                    this.roleStaff.staff_id = response.id;
                    
                    response.roles.forEach(index=>{
                        this.roleStaff.role_id.push(index.id);
                    })
                });
                
                this.myModel = true;
            },
            closeModel() {
                this.myModel = false;
            },
            async retrieveStaffs() {
                try {
                    this.staffs = await AuthorizationService.getByStaff();
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveStaffs();
            },
            reset () {
                this.roleStaff.role_id = [];
                this.roleStaff.staff_id = "";
            },
            async createRoleByStaff(data) {
                try {    
                    await AuthorizationService.createRoleStaff(data).then((response) => {
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
                            title: 'Phân vai trò cho nhân viên thành công.'
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

    .btn-staff {
        width: 140px;
        color: #000;
        background-color: #1ed085;
        margin: 6px 4px;
        border-radius: 4px;
        display: inline-block;
        padding: 4px;
    }
</style>
