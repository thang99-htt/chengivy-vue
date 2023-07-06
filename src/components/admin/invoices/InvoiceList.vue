
<template>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class=" example1 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">#</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Ngày lập</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Tổng giá trị</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(invoice, index) in invoicesList"
            :key="invoice"
        >
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{ invoice.date }}</td>
            <td>{{ formatPrice(invoice.total_price) }} đ</td>
            <td>
                <!-- <button
                    type="button"
                    class="me-2 btn btn-primary"
                >
                    <router-link
                          :to="{
                              name: 'invoice.detail',
                              params: { id: invoice.id },
                          }" 
                    >
                        <i class="fa fa-eye"></i>
                    </router-link>
                </button> -->
                <button
                    v-if="invoice.id"
                    type="button"
                    class="me-2 btn btn-danger"
                    @click="deleteInvoice(invoice.id)"
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
    import InvoiceService from "@/services/admin/invoice.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    import {mapGetters} from 'vuex';
    import { formatPrice, getImage, initializeDataTable } from '@/utils';

    export default {
        name: 'InvoiceList',
        props: {
            invoices: { type: Array, default: [] },
        },
        mounted() {
            this.$nextTick(() => {
                initializeDataTable();
            });
        },
        data() {
            return {
                invoicesList: this.invoices,
                status: 0,
            };
        },
        beforeUpdate() {
            $('.example1').DataTable().destroy();
        },
        methods: {
            getImage,
            async retrieveInvoices() {
                try {
                    this.invoicesList = await InvoiceService.getAll();
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
                this.retrieveInvoices();
            },
            deleteInvoice(id) {
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
                        InvoiceService.delete(id).then((res) => {
                            if(res.success) {
                                this.refreshList();
                            }
                        })
                        this.$swal.fire('Đã xóa thành công!','','success')
                    }
                })
            },
            formatPrice,
        },
        computed: {
            ...mapGetters(['getAdmin'])
        }
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

    .btn-order-status {
        width: 125px;
        height: 30px;
        padding: 0 !important;
        font-size: 15px !important;
        color: #fff;
        border: none;
        border-radius: 4px;
    }
    
    .order-status1 {
        background-color: #c20000;
    }

    .order-status2 {
        background-color: #e75a02;
    }

    .order-status3 {
        background-color: #f5a400;
    }

    .order-status4 {
        background-color: #007e94;
    }

    .order-status5 {
        background-color: #0098c2;
    }

    .order-status6 {
        background-color: #00d4f0;
    }

    .order-status7 {
        background-color: #d1d800;
    }

    .order-status8 {
        background-color: #7cca00;
    }

    .order-status9 {
        background-color: #00b90c;
    }

    .order-status10 {
        background-color: #676767e7;
    }
</style>
