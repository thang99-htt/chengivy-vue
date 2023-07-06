<script>
    import $ from 'jquery'
    import PermissionService from "@/services/admin/permission.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    import { initializeDataTable } from '../../../utils';
    
    export default {
        name: 'PermissionList',
        components: {
            
        },
        props: {
            permissions: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        mounted() {
            PermissionService.getAll().then((response) => {
                this.permissions = response;
                this.$nextTick(() => {
                    initializeDataTable();
                })
            });
        },
        data() {
            return {
                permissions: [],
            };
        },
        beforeUpdate() {
            $('.example1').DataTable().destroy();
        },
        methods: {
            async retrievePermissions() {
                try {
                    this.permissions= await PermissionService.getAll();
                    this.$nextTick(() => {
                        $('.example1').DataTable();
                    })
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrievePermissions();
            },
            deletePermission(id) {
                this.$swal.fire({
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
                        PermissionService.delete(id).then((res) => {
                            if(res.success) {
                                this.refreshList();
                            }
                        })
                        this.$swal.fire('Đã xóa thành công!','','success')
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
            <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">#</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Vai Trò</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Mô Tả</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Ngày</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(permission, index) in permissions"
            :key="permission"
            :class="{ active: index === activeIndex }"
        >
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{ permission.name }}</td>
            <td>{{ permission.description }}</td>
            <td>{{ new Date(permission.created_at).toLocaleString() }}</td>
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
                              name: 'permission.edit',
                              params: { id: permission.id },
                          }" 
                    >
                        <i class="fa fa-pen"></i>
                    </router-link>
                </button>
                <button
                    v-if="permission.id"
                    type="button"
                    class="ms-2 btn btn-danger"
                    @click="deletePermission(permission.id)"
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