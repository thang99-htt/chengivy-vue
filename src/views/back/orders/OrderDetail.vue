<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="order" class="box box-info">
                    <div class="box-header with-border">
                        <router-link to="/admin/orders">
                            <button
                                type="button"
                                class="btn btn-dark me-4"
                            >
                                <i class="fa fa-arrow-left"></i>
                            </button>
                        </router-link>
                        <h3 class="box-title">Chi Tiết Đơn hàng</h3>
                    </div>
                    
                    <div class="box-body">
                        <div class="row column1 social_media_section">
                            <div class="col-4">
                                <div class="full socile_icons tw margin_bottom_30">
                                    <div class="social_icon">
                                        <i class="fa fa-shopping-cart"></i>
                                            Thông tin đơn hàng
                                    </div>
                                    <div class="social_cont">
                                        <p>Tổng giá trị đơn hàng: {{ formatPrice(order.total_price) }} VNĐ</p>
                                        <p>Trạng thái đơn hàng: {{ order.status.name }}</p>
                                        <p>Phương thức thanh toán: {{ order.payment.name }}</p>
                                        <p>Ngày đặt: {{ order.order_date }}</p>
                                        <p>Ngày dự kiến giao: {{ order.estimate_date }}</p>
                                        <p>Ngày hủy: {{ order.cancle_date }}</p>
                                        <p>Ngày nhận: {{ order.receipt_date }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="full socile_icons linked margin_bottom_30">
                                    <div class="social_icon">
                                        <i class="fa fa-user"></i>
                                        Thông tin khách hàng
                                    </div>
                                    <div class="social_cont">
                                        <p>Họ tên: {{ order.user.name }}</p>
                                        <p>Email: {{ order.user.email }}</p>
                                        <p>Số điện thoại: {{ order.user.user_detail.phone }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="full socile_icons fb margin_bottom_30">
                                    <div class="social_icon">
                                        <i class="fa fa-car"></i>
                                        Thông tin vận chuyển
                                    </div>
                                    <div class="social_cont">
                                        <p>Họ tên: {{ order.user.name }}</p>
                                        <p>Điện thoại: {{ order.contact.phone }}</p>
                                        <p>Địa chỉ: {{ order.contact.address }}</p>
                                        <p>Phường/Xã: {{ order.contact.address_detail.name }}</p>
                                        <p>Quận/Huyện: {{ order.contact.address_detail.district.name }}</p>
                                        <p>Tỉnh/Thành Phố: {{ order.contact.address_detail.district.city.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="head-product">
                                Thông tin sản phẩm
                            </div>
                            <OrderDetail
                                :order="order"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import OrderService from "@/services/back/order.service";
    import OrderDetail from "@/components/back/orders/OrderDetail.vue";
    export default {
        components: {
            OrderDetail,
        },
        props: {
            id: { type: String, required: true },
            order: { type: Object, required: true },
        },
        data() {
            return {
                order: null,
            };
        },
        methods: {
            async getOrder(id) {
                try {
                    this.order = await OrderService.get(id);
                } catch (error) {
                    console.log(error);
                    // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                    this.$router.push({
                        name: "notfound",
                        params: {
                            pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        },
        created() {
            this.getOrder(this.id);
        },
    };
</script>
<style>
    .box-body {
        padding: 30px;
    }
    .social_cont {
        height: 230px;
    }
    .social_cont p {
        text-align: left;
        padding-left: 10px;
    }
    .head-product {
        font-size: 25px;
        font-weight: 500;
        padding: 12px;
        color: #fff;
        background-color: #ff9800 ;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
</style>