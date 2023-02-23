<template>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class=" example1 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th>#</th>
            <th>Ngày đặt</th>
            <th>Khách hàng</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Tổng tiền (VNĐ)</th>
            <th>Phương thức thanh Toán</th>
            <th>Trạng thái</th>
            <th style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(order, index) in purchases"
            :key="order"
        >
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{ order.order_date }}</td>
            <td>{{ order.user.name  }}</td>
            <td>{{ order.user.email  }}</td>
            <td>{{ order.contact.phone  }}</td>
            <td>{{ formatPrice(order.total_price) }}</td>
            <td>{{ order.payment.name }}</td>
            <td>{{ order.status.name }}</td>
            <td>
                <router-link
                      :to="{
                          name: 'purchase.detail',
                          params: { id: order.id },
                      }" 
                >
                    Xem chi tiết
                </router-link>
            </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
    import OrderService from "@/services/front/order.service";
    import axios from 'axios';

    export default {
        name: 'PurchaseList',
        props: {
            purchases: { type: Array, default: [] },
        },
        data() {
            return {
                token: localStorage.getItem('token'),
                purchases: [],
            };
        },
        async mounted() {
            try {
                await axios.get(`/api/user`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }).then(async (response) => {
                    this.purchases = await OrderService.getAllPurchase(response.data.id);
                });
            } catch (error) {
                console.log(error);
            }
        },
        methods: {
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            async retrievePurchases() {
                try {
                    await axios.get(`/api/user`, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }).then(async (response) => {
                        this.purchases = await OrderService.getAllPurchase(response.data.id);
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrievePurchases();
            },
            deletePurchase(id) {
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

</style>