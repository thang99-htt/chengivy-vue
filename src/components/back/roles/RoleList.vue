<script>
    import $ from 'jquery'
    import RoleService from "@/services/back/role.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    
    export default {
        name: 'RoleList',
        components: {
            
        },
        props: {
            roles: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        mounted() {
            RoleService.getAll().then((response) => {
                this.roles = response;
                this.$nextTick(() => {
                    $('.example1').DataTable()
                })
            });
        },
        data() {
            return {
                roles: [],
            };
        },
        beforeUpdate() {
            $('.example1').DataTable().destroy();
        },
        methods: {
            async retrieveRoles() {
                try {
                    this.roles= await RoleService.getAll();
                    this.$nextTick(() => {
                        $('.example1').DataTable()
                    })
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveRoles();
            },
            deleteRole(id) {
                Swal.fire({
                    title: 'Bạn có chắc?',
                    text: "Bạn sẽ không thể hoàn tác lại điều này!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy'
                }).then((result) => {
                    if (result.value) {
                        RoleService.delete(id).then((res) => {
                            if(res.success) {
                                this.refreshList();
                            }
                        })
                        Swal.fire('Đã xóa thành công!','','success')
                    }
                })
            },
            deleteAll(id){
                alert(id)
            }
        },
        
    };
</script>
<template>
    <table
        aria-describedby="example1_info" role="grid" 
        class="example1 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th aria-label="Rendering engine: activate to sort column descending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" style="width: 10px;">
                <input
                    v-model="deleteAll"
                    type="checkbox"
                    class="form-check-input"
                />
            </th>
            <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">#</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Vai Trò</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Mô Tả</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Ngày</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(role, index) in roles"
            :key="role"
            :class="{ active: index === activeIndex }"
        >
            <td>
                <input
                    :value="role.id" 
                    v-model="deleteAll"
                    type="checkbox"
                    class="form-check-input"
                />
            </td>
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{ role.name }}</td>
            <td>{{ role.description }}</td>
            <td>{{ new Date(role.created_at).toLocaleString() }}</td>
            <td>
                <button
                    type="button"
                    class="ml-2 btn btn-primary"
                >
                    <i class="fas fa-eye"></i>
                </button>
                <button
                    type="button"
                    class="ms-2 btn btn-success"
                >
                    <router-link
                          :to="{
                              name: 'role.edit',
                              params: { id: role.id },
                          }" 
                    >
                        <i class="fa fa-pen"></i>
                    </router-link>
                </button>
                <button
                    v-if="role.id"
                    type="button"
                    class="ms-2 btn btn-danger"
                    @click="deleteRole(role.id)"
                >
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
      </tbody>
    </table>
</template>

<style>
    
    @import url('/static/js/plugins/datatables/dataTables.bootstrap.css');
    @import url('/static/css/bootstrap.min.css');

    table.dataTable thead .sorting:after,
    table.dataTable thead .sorting_asc:after,
    table.dataTable thead .sorting_desc:after {
        font-family: 'FontAwesome';
    }
    
    table.dataTable thead .sorting:after {
        content: '\f0dc';
    }
    
    table.dataTable thead .sorting_asc:after {
        content: '\f0dd';
    }
    
    table.dataTable thead .sorting_desc:after {
        content: '\f0de';
    }

    select.input-sm {
        line-height: unset;
    }
</style>