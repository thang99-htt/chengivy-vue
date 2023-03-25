<template>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class=" example1 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th>Đơn hàng</th>
            <th>Ngày đặt</th>
            <th>Gửi đến</th>
            <th>Tổng đơn đặt hàng</th>
            <th>Trạng thái</th>
            <th style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(order, index) in purchases"
            :key="order"
        >
            <td >
                {{ order.id }}
            </td>
            <td>{{ order.order_date }}</td>
            <td>{{ order.user.name  }}</td>
            <td>{{ formatPrice(order.total_price) }} đ</td>
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
    import OrderService from "@/services/user/order.service";
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