<script>
    import $ from 'jquery'
    import PaymentVoucherService from "@/services/admin/payment-voucher.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    import { formatPrice, initializeDataTable } from '@/utils';
    
    export default {
        name: 'SupplierList',
        props: {
            payment_vouchers: { type: Array, default: [] },
        },
        mounted() {
            this.$nextTick(() => {
                initializeDataTable();
            })
        },
        data() {
            return {
                payment_vouchersList: this.payment_vouchers,
            };
        },
        beforeUpdate() {
            $('.example1').DataTable().destroy();
        },
        methods: {
            async retrievePaymentVouchers() {
                try {
                    this.payment_vouchersList = await PaymentVoucherService.getAll();
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
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrievePaymentVouchers();
            },
            deletePaymentVoucher(id) {
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
                        PaymentVoucherService.delete(id).then((res) => {
                            if(res.success) {
                                this.refreshList();
                                this.$swal.fire('Đã xóa thành công!','','success')
                            }
                        })
                    }
                })
            },
            formatPrice,
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
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Ngày lập</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Số tiền thanh toán</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Diễn giải</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(payment, index) in payment_vouchersList"
            :key="payment"
        >
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{ payment.date }}</td>
            <td>{{ formatPrice(payment.total_price) }}</td>
            <td>{{ payment.description }}</td>
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
                              name: 'payment-voucher.edit',
                              params: { id: payment.id },
                          }" 
                    >
                        <i class="fa fa-pen"></i>
                    </router-link>
                </button>
                <button
                    v-if="payment.id"
                    type="button"
                    class="ms-2 btn btn-danger"
                    @click="deletePaymentVoucher(payment.id)"
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