
<template>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class=" example1 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">#</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Mã đơn hàng</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Ngày đặt</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Khách hàng</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Email</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Số điện thoại</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Tổng giá trị</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Phương thức thanh toán</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Trạng thái</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(order, index) in orders"
            :key="order"
        >
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{ order.id }}</td>
            <td>{{ order.order_date }}</td>
            <td>{{ order.user.name  }}</td>
            <td>{{ order.user.email  }}</td>
            <td>{{ order.contact.phone  }}</td>
            <td>{{ formatPrice(order.total_price) }} đ</td>
            <td>{{ order.payment.name }}</td>
            <td>
                <button
                    v-if="order.status.id == 1" class="btn-order-status order-status1"
                    @click="statusUpdate(order)"
                >
                    {{ order.status.name }}
                </button>
                <button
                    v-if="order.status.id == 2" class="btn-order-status order-status2"
                    @click="statusUpdate(order)"
                >
                    {{ order.status.name }}
                </button> 
                <button
                    v-if="order.status.id == 3" class="btn-order-status order-status3"
                    @click="statusUpdate(order)"
                >
                    {{ order.status.name }}
                </button> 
                <button
                    v-if="order.status.id == 4" class="btn-order-status order-status4"
                    @click="statusUpdate(order)"
                >
                    {{ order.status.name }}
                </button> 
                <button
                    v-if="order.status.id == 5" class="btn-order-status order-status5"
                    @click="statusUpdate(order)"
                >
                    {{ order.status.name }}
                </button> 
                <button
                    v-if="order.status.id == 6" class="btn-order-status order-status6"
                    @click="statusUpdate(order)"
                >
                    {{ order.status.name }}
                </button> 
                <button
                    v-if="order.status.id == 7" class="btn-order-status order-status7"
                    @click="waitReceiptOrder()"
                >
                    {{ order.status.name }}
                </button> 
                <button
                    v-if="order.status.id == 8" class="btn-order-status order-status8"
                    @click="statusUpdate(order)"
                >
                    {{ order.status.name }}
                </button> 
                <button
                    v-if="order.status.id == 9" class="btn-order-status order-status9"
                    @click="statusUpdate(order)"
                >
                    {{ order.status.name }}
                </button>  
                <button
                    v-if="order.status.id == 10" class="btn-order-status order-status10"
                    @click="statusUpdate(order)"
                >
                    {{ order.status.name }}
                </button>
            </td>
            <td>
                <button
                    type="button"
                    class="me-2 btn btn-primary"
                >
                    <router-link
                          :to="{
                              name: 'order.detail',
                              params: { id: order.id },
                          }" 
                    >
                        <i class="fa fa-eye"></i>
                    </router-link>
                </button>
                <button
                    v-if="order.id"
                    type="button"
                    class="me-2 btn btn-danger"
                    @click="deleteOrder(order.id)"
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
    import OrderService from "@/services/back/order.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    
    export default {
        name: 'OrderList',
        props: {
            orders: { type: Array, default: [] },
        },
        mounted() {
            OrderService.getAll().then((response) => {
                this.orders = response;
                this.$nextTick(() => {
                    $('.example1').DataTable()
                })
            });
        },
        data() {
            return {
                orders: [],
                status: 0,
            };
        },
        beforeUpdate() {
            $('.example1').DataTable().destroy();
        },
        methods: {
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            async retrieveOrders() {
                try {
                    this.orders = await OrderService.getAll();
                    this.$nextTick(() => {
                        $('.example1').DataTable()
                    })
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveOrders();
            },
            statusUpdate(order) {
                try {
                    OrderService.updateStatus(order.id, order.status.id)
                    .then( (response) => {
                        this.refreshList();
                    })                  

                } catch (error) {
                    console.log(error);
                }   
            },
            waitReceiptOrder() {
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
                    icon: 'warning',
                    title: 'Chờ khách hàng xác nhận đã nhận.'
                })
            },
            deleteOrder(id) {
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
                        OrderService.delete(id).then((res) => {
                            if(res.success) {
                                this.refreshList();
                            }
                        })
                        Swal.fire('Đã xóa thành công!','','success')
                    }
                })
            },
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
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
