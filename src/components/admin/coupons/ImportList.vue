<template>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class="example1 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">#</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Nhân viên</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Nhà cung cấp</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Phiếu chi</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Ngày lập</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Tổng tiền</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Thuế GTGT</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Tổng giá trị</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(coupon, index) in import_couponsList"
            :key="coupon"
        >
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{ coupon.staff }}</td>
            <td>{{ coupon.supplier.name }}</td>
            <td>{{ coupon.payment_voucher.id }}</td>
            <td>{{ new Date(coupon.date).toLocaleString() }}</td>
            <td>{{ formatPrice(coupon.total_price) }}</td>
            <td>{{ formatPrice(coupon.value_added) }}</td>
            <td>{{ formatPrice(coupon.total_value) }}</td>
            <td>
                <button
                    type="button"
                    class="ms-2 btn btn-primary"
                >
                    <router-link
                          :to="{
                              name: 'import-coupon.view',
                              params: { id: coupon.id },
                          }" 
                    >
                        <i class="fa fa-eye"></i>
                    </router-link>
                </button>
                <!-- <button
                    type="button"
                    class="ms-2 btn btn-success"
                >
                    <router-link
                          :to="{
                              name: 'import-coupon.edit',
                              params: { id: coupon.id },
                          }" 
                    >
                        <i class="fa fa-pen"></i>
                    </router-link>
                </button> -->
                <button
                    v-if="coupon.id"
                    type="button"
                    class="ms-2 btn btn-danger"
                    @click="deleteImportCoupon(coupon.id)"
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
    import ImportCouponService from "@/services/admin/import-coupon.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    
    export default {
        name: 'ImportCouponList',
        props: {
            import_coupons: { type: Array, default: [] },
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
                import_couponsList: this.import_coupons,
                status: 0,
            };
        },
        beforeUpdate() {
            $('.example1').DataTable().destroy();
        },
        methods: {
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            async retrieveImportCounpons() {
                try {
                    this.import_couponsList= await ImportCouponService.getAll();
                    this.$nextTick(() => {
                        $('.example1').DataTable()
                    })
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveImportCounpons();
            },
            deleteImportCoupon(id) {
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
                        ImportCouponService.delete(id).then((res) => {
                            if(res.success) {
                                this.refreshList();
                            }
                        })
                        this.$swal.fire('Đã xóa thành công!','','success')
                    }
                })
            },
        },
        
    };
</script>

<style>
    @import url('/static/js/plugins/datatables/dataTables.bootstrap.css');
    @import url('/static/css/bootstrap.min.css');
</style>
