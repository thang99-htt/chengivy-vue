<template>
    <table
        aria-describedby="example1_info" role="grid" 
        class="example1 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">#</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Họ tên</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">CMT/CCCD</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Email</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Số điện thoại</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Giới tính</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Ngày sinh</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Địa chỉ</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Trạng thái</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(staff, index) in staffs"
            :key="staff"
            :class="{ active: index === activeIndex }"
        >
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{ staff.name }}</td>
            <td>{{ staff.identity_card }}</td>
            <td>{{ staff.email }}</td>
            <td>{{ staff.phone }}</td>
            <td>{{ staff.gender }}</td>
            <td>{{  new Date(staff.birth_date).toLocaleString() }}</td>
            <td>{{ staff.address }}</td>
            <td>
                <button
                    class="btn-sm"
                    :class="[staff.status == 1 ? 'btn-show' : 'btn-hide']"
                    @click="statusUpdate(staff)"
                >
                    {{staff.status == 1 ? 'Kích hoạt' : 'Tạm khóa'}}    
                </button>
            </td>
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
                              name: 'staff.edit',
                              params: { id: staff.id },
                          }" 
                    >
                        <i class="fa fa-pen"></i>
                    </router-link>
                </button>
                <button
                    v-if="staff.id"
                    type="button"
                    class="ms-2 btn btn-danger"
                    @click="deleteStaff(staff.id)"
                >
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
    import $ from 'jquery'
    import StaffService from "@/services/admin/staff.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    
    export default {
        name: 'StaffList',
        components: {
            
        },
        props: {
            staffs: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        mounted() {
            StaffService.getAll().then((response) => {
                this.staffs = response;
                this.$nextTick(() => {
                    $('.example1').DataTable()
                })
            });
        },
        data() {
            return {
                staffs: [],
                status: 0,
            };
        },
        beforeUpdate() {
            $('.example1').DataTable().destroy();
        },
        methods: {
            async retrieveStaffs() {
                try {
                    this.staffs= await StaffService.getAll();
                    this.$nextTick(() => {
                        $('.example1').DataTable();
                    })
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveStaffs();
            },
            deleteStaff(id) {
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
                        StaffService.delete(id).then((res) => {
                            if(res.success) {
                                this.refreshList();
                            }
                        })
                        Swal.fire('Đã xóa thành công!','','success')
                    }
                })
            },
            statusUpdate(staff) {
                try {
                    console.log(staff.status);
                    StaffService.updateStatus(staff.id, staff.status)
                    .then( (response) => {
                        this.refreshList();
                        console.log(response.staff.status);
                    })                  

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
    .btn-show,
    .btn-hide {
        width: 80px !important;
    }
</style>