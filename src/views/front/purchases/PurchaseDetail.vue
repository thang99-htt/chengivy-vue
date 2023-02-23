<template>
    <div class="row">
        <div class="col-md-12">
            <div v-if="order">
                <div class="box-header with-border p-0 mb-4">
                    <h3 class="box-title">Chi Tiết Đơn hàng</h3>
                </div>
                
                <div class="row column1 social_media_section">
                    <div class="col-6">
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
                    <div class="col-6">
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
                    <PurchaseDetail
                        :order="order"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import OrderService from "@/services/front/order.service";
    import PurchaseDetail from "@/components/front/purchases/PurchaseDetail.vue";
    import axios from 'axios';

    export default {
        components: {
            PurchaseDetail,
        },
        props: {
            id: { type: String, required: true },
            order: { type: Object, required: true },
        },
        data() {
            return {
                token: localStorage.getItem('token'),
                order: null,
            };
        },
        methods: {
            async getPurchase(id) {
                try {
                    await axios.get(`/api/user`, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }).then(async (response) => {
                        this.order = await OrderService.getPurchase(response.data.id, id);
                    });
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
            this.getPurchase(this.id);
        },
    };
</script>
<style>
    @import "@/assets/admin.css";
    .box-body {
        padding: 30px;
    }
    .social_cont {
        height: 180px;
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