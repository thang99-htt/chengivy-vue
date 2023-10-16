<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold">Xử lý Yêu cầu Trả hàng / Hoàn tiền</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div v-if="returnLocal" class="box box-info">
                        <div class="box-body">
                            <Form class="return">
                                <div class="d-flex justify-content-between">
                                    <div class="order">
                                        <p>Đơn hàng: #{{ returnLocal.order_id }}</p>
                                        <p>Ngày nhận hàng: {{ returnLocal.order.receipted_at }}</p>
                                        <p>Ngày yêu cầu hoàn trả: {{ returnLocal.requested_at }}</p>
                                        <p>Ngày hoàn trả: {{ returnLocal.returned_at }}</p>
                                    </div>
                                    <div class="me-5" v-if="returnLocal.order">
                                        <p class="status">Trạng thái: {{ returnLocal.status }}</p>
                                        <p class="reason">Lý do: {{ returnLocal.reason }}</p>
                                    </div>
                                </div>
                                <hr>
                                <div>
                                    <p>Khách hàng: {{ returnLocal.order.name_receiver }}</p>
                                    <p>Email: {{ returnLocal.order.phone_receiver }}</p>
                                </div>
                                <div>
                                    <p class="price">Số tiền hoàn trả: {{ formatPrice(returnLocal.total_price) }}</p>
                                    <p>Phương thức thanh toán: {{ returnLocal.method }}</p>
                                    <p>Số tài khoản: {{ returnLocal.order.user.profiles[0].bank_account }}</p>
                                </div>
                                <hr>
                                <div class="form-group">
                                    <label class="product-return">Sản phẩm hoàn trả:</label>
                                    <router-link class="d-block" :to="{
                                        name: 'purchase.detail',
                                        params: { id: returnLocal.id },
                                    }" v-if="returnLocal.order">
                                        <div class="purchase-content">
                                            <div class="purchase-item" v-for="product in returnLocal.return_product" :key="product.id">
                                                <div class="purchase-info">
                                                    <div class="d-flex">
                                                        <img class="d-block me-3" width="100" :src="product.product.product_image[0].image" alt="">
                                                        <div>
                                                            <router-link :to="{
                                                                name: 'product.detail',
                                                                params: { id: product.id },
                                                            }" class="text-dark">
                                                                {{ product.name }}
                                                            </router-link>
                                                            <p>Phân loại: {{ product.color }}, {{ product.size }}</p>
                                                            <p>
                                                                <span class="me-1">{{ product.quantity }} x </span>
                                                                <span class="me-3 text-danger " v-if="product.price_discount > 0">
                                                                    {{ formatPrice(product.price - product.price_discount) }}
                                                                </span>
                                                                <span :class="{ 'text-decoration-line-through ': product.price_discount > 0 }">
                                                                    {{ formatPrice(product.price) }}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="purchase-price">
                                                    <p v-if="product.price_discount > 0">{{
                                                        formatPrice((product.price - product.price_discount) * product.quantity) }}</p>
                                                    <p v-else>{{ formatPrice(product.price * product.quantity) }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                                <div class="form-group">
                                    <label for="" class="mb-2">Mô tả:</label>
                                    <p>{{ returnLocal.description }}</p>
                                </div>
                                <div class="form-group">
                                    <div v-if="returnLocal.return_image" class="me-3">
                                        <span v-for="image in returnLocal.return_image" :key="image">
                                            <img :src="image.image" alt="Hình ảnh"
                                                class="img-edit img-responsive center-block me-2" width="150">
                                        </span>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ReturnService from "@/services/admin/return.service";
import { formatPrice } from '@/utils';

export default {
    props: {
        returnID: { type: Number, required: true },
    },
    data() {
        return {
            returnLocal: null
        };
    },
    methods: {
        formatPrice,
        async getReturn() {
            this.returnLocal = await ReturnService.get(this.returnID);
        },
        async submitReturn() {
            const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            })
            try {
                await ReturnService.update(this.return.id, this.return);
                Toast.fire({
                    icon: 'success',
                    title: 'Xử lý yêu cầu đổi trả thành công.'
                });
                this.$parent.refreshList();
                this.closeModal();
            } catch (error) {
                console.log(error);
            }
        },
        closeModal() {
            this.$emit('closeModal');
        },
    },
    mounted() {
        this.getReturn();
    },
};
</script>

<style scoped>
    .return .status {
        color: #00b700;
        font-weight: bold;
    }
    .return .reason {
        color: #ff0000;
    }

    .return .order p:first-child {
        font-weight: bold;
        font-size: 20px;
        color: #000;
        text-decoration: underline;
    }

    .return .order p:nth-child(3) {
        color: #0000cd;
    }

    .return .price {
        color: #ff0000;
        font-weight: bold;
    }

    .return .product-return {
        font-size: 17px;
        color: #000;
        font-weight: bold;
        margin-bottom: 10px;
        margin-top: 15px;
    }
</style>