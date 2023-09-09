<template>
    <section class="content">
        <div class="box-body">
            <div class="order-detail" v-if="order">
                <div class="order-detail__left">
                    <div class="order-info">
                        <div class="item-header">
                            <h4>Đơn hàng: <span class="order-id">{{ order.id }}</span></h4>
                            <p>
                                <span>Nhân viên:</span>
                                <span>{{ order.staff.name }} - {{ order.staff.email }}</span>
                            </p>
                            <span class="order-status">{{ order.status.name }}</span>
                        </div>
                        <div class="item-content">
                            <p>
                                <span>Ngày đặt:</span>
                                <span>{{ order.ordered_at }}</span>
                            </p>
                            <p>
                                <span>Ngày nhận:</span>
                                <span>{{ order.receipted_at }}</span>
                            </p>
                            <p>
                                <span>Ngày hủy:</span>
                                <span>{{ order.cancled_at }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="order-customer">
                        <div class="order-customer__acc">
                            <div class="item-header">
                               <h4>Khách hàng: </h4>
                            </div>  
                            <div class="item-content">
                                <p>{{ order.user_account_detail.name }}</p>
                                <p>{{ order.user_account_detail.email }}</p>
                            </div>
                        </div>
                        <div class="order-customer__receiver">
                            <div class="item-header">
                                <h4>Người nhận:</h4> 
                            </div>  
                            <div class="item-content">
                                <p>
                                    <span class="pe-3 me-3 border-end">{{ order.name_receiver }}</span>
                                    <span>{{ order.phone_receiver }}</span>
                                </p>
                                <p>{{ order.user_address_detail }}, {{ order.user_address }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="order-note">
                        <div class="item-header">
                            <h4>Ghi chú đơn hàng: <span class="fw-normal fs-6">{{ order.note }}</span></h4>
                        </div>
                    </div>
                    <div class="order-product">
                        <OrderDetail
                            :order="order"
                        />
                    </div>
                </div>
                <div class="order-detail__right">
                    <div class="order-payment">
                        <div class="item-header">
                            <h4>Thanh toán</h4>
                        </div>  
                        <div class="item-content">
                            <p>{{ order.payment_method.description }}</p>
                        </div>
                    </div>
                    <div class="order-summary">
                        <div class="item-content">
                            <p>
                                <span>Tổng đơn hàng</span>
                                <span>{{ formatPrice(order.total_price) }}</span>
                            </p>
                            <p>
                                <span>Phí vận chuyển</span>
                                <span>{{ formatPrice(order.fee) }}</span>
                            </p>
                            <p v-if="order.voucher">
                                <span>Mã giảm giá <span class="voucher">{{ order.voucher.name }}</span></span>
                                <span class="sale">{{ formatPrice(order.voucher.price_discount) }}</span>
                            </p>
                            <p>
                                <span>Tổng giảm giá</span>
                                <span class="sale">{{ formatPrice(order.total_discount) }}</span>
                            </p>
                            <p>
                                <span>Tổng giá trị</span>
                                <span>{{ formatPrice(order.total_value) }}</span>
                            </p>
                            <p class="price">
                                <p>
                                    <span>Cần thanh toán</span>
                                    <span>({{ order.items.length }} sản phẩm)</span>
                                </p>
                                <p>
                                    <span>{{ formatPrice(order.total_value) }}</span>
                                </p>
                            </p>
                        </div>
                    </div>
                    <div class="order-button">

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import OrderService from "@/services/admin/order.service";
    import OrderDetail from "@/components/admin/orders/OrderDetail.vue";
    import { formatPrice } from '@/utils';

    export default {
        components: {
            OrderDetail,
        },
        props: {
            id: { type: Number, required: true },
        },
        data() {
            return {
                order: null,
            };
        },
        methods: {
            formatPrice,
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
        },
        created() {
            this.getOrder(this.id);
        },
    };
</script>
<style>
    .order-detail {
        display: flex;
        justify-content: space-between;
    }
    .order-detail__left {
        width: 70%;
    }

    .order-detail__right {
        width: 28%;
    }

    .order-detail .order-info,
    .order-detail .order-note,
    .order-detail .order-product,
    .order-detail .order-payment,
    .order-detail .order-summary,
    .order-detail .order-customer .order-customer__acc,
    .order-detail .order-customer .order-customer__receiver {
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
    }

    .order-detail .order-customer {
        display: flex;
        justify-content: space-between;
    }

    .order-detail .order-customer .order-customer__acc {
        width: 35%;
    }
    .order-detail .order-customer .order-customer__receiver {
        width: 64%;
    }
    .order-detail .item-header {
        background-color: #f3f8ff;
        padding: 10px 16px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        border-bottom: 1px solid #ccc;
        position: relative;
    }

    .order-detail .order-note .item-header {
        border-bottom: 0;
    }

    .order-detail .item-header h4 {
        color: #565656;
        font-size: 18px;
        margin-bottom: 0;
    }

    .order-detail .item-header .order-id {
        color: #1103d6;
    }

    .order-detail .item-header .order-status {
        width: 85px;
        color: #fff;
        background-color: #00c911;
        padding: 1px 10px;
        border-radius: 6px;
        position: absolute;
        content: "";
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }

    .order-detail .item-content {
        padding: 6px 16px;
    }
    
    .order-detail .item-content p span:first-child,
    .order-detail .item-header p span:first-child {
        color: #9f9f9f;
        margin-right: 10px;
    }

    .order-detail .item-content p span:last-child,
    .order-detail .item-header p span:last-child {
        color: #555;
    }

    .order-detail .item-content p,
    .order-detail .item-header p {
        margin: 4px 0;
    }

    .order-detail .order-summary .item-content p {
        display: flex;
        justify-content: space-between;
    }

    .order-detail .order-summary .item-content p span:last-child {
        font-weight: 600;
    }

    .order-detail .order-summary .item-content p .voucher {
        color: #da4343;
        border: 1px solid #da4343;
        border-radius: 6px;
        padding: 0 3px;
    }

    .order-detail .order-summary .item-content .price {
        margin-top: 60px;
    }

    .order-detail .order-summary .item-content .price p:first-child {
        display: flex;
        flex-direction: column;
    }

    .order-detail .order-summary .item-content .price p:last-child span {
        color: #1103d6;
        font-size: 24px;
    }
    
</style>