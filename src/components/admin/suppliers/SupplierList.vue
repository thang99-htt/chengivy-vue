<script>
    import $ from 'jquery'
    import SupplierService from "@/services/admin/supplier.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    
    export default {
        name: 'SupplierList',
        props: {
            suppliers: { type: Array, default: [] },
        },
        mounted() {
            this.$nextTick(() => {
                $(".example1").DataTable({
                    "language": {
                        "search": "Tìm kiếm:",
                        "loadingRecords": "Đang tải...",
                        "zeroRecords": "Không tìm thấy kết quả",
                        "lengthMenu": "Hiển thị _MENU_ bản ghi",
                        "info": "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
                        "paginate": {
                            "first": "Trang đầu",
                            "last": "Trang cuối",
                            "next": "Trang sau",
                            "previous": "Trang trước"
                        }
                    }
                })
            })
        },
        data() {
            return {
                suppliersList: this.suppliers,
            };
        },
        beforeUpdate() {
            $('.example1').DataTable().destroy();
        },
        methods: {
            deleteSupplier(id) {
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
                        SupplierService.delete(id).then(async (res) => {
                            if(res.success) {
                                this.suppliersList = await SupplierService.getAll();
                                this.$nextTick(() => {
                                    $(".example1").DataTable({
                                        "language": {
                                            "search": "Tìm kiếm:",
                                            "loadingRecords": "Đang tải...",
                                            "zeroRecords": "Không tìm thấy kết quả",
                                            "lengthMenu": "Hiển thị _MENU_ bản ghi",
                                            "info": "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
                                            "paginate": {
                                                "first": "Trang đầu",
                                                "last": "Trang cuối",
                                                "next": "Trang sau",
                                                "previous": "Trang trước"
                                            }
                                        }
                                    })
                                })
                                Swal.fire('Đã xóa thành công!','','success');
                            }
                        })
                    }
                })
            },
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
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Tên</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Địa chỉ</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Điện thoại</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Email</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(supplier, index) in suppliersList"
            :key="supplier"
        >
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{ supplier.name }}</td>
            <td>{{ supplier.address }}</td>
            <td>{{ supplier.phone }}</td>
            <td>{{ supplier.email }}</td>
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
                              name: 'supplier.edit',
                              params: { id: supplier.id },
                          }" 
                    >
                        <i class="fa fa-pen"></i>
                    </router-link>
                </button>
                <button
                    v-if="supplier.id"
                    type="button"
                    class="ms-2 btn btn-danger"
                    @click="deleteSupplier(supplier.id)"
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

</style>