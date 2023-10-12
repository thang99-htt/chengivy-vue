<template>
    <div class="profile-info">
        <div class="liveAlert"></div>
        <h3>Yêu cầu Trả hàng / Hoàn tiền</h3>

        <div class="profile-item" v-for="ret in returns" :key="ret">
            <hr>
            <div class="return-cancel">
                <h3>Đơn hàng #{{ ret.order_id }}</h3>
                <div class="button" v-if="ret.status == 'Đã ghi nhận'">
                    <button class="btn" @click="cancelReturn(ret.id)">Hủy yêu cầu</button>
                </div>
            </div>
            <div class="return-head">
                <p class="return-status">
                    <span class="pe-3 border-end">
                        <a class="text-status">
                            {{ ret.status }}
                        </a>
                    </span>
                    <span class="ps-2 pe-3">
                        <a class="text-primaly" v-if="ret.returned_at">Ngày hoàn trả: {{ ret.returned_at }}</a>
                        <a class="text-primaly" v-else>Ngày yêu cầu: {{ ret.requested_at }}</a>
                    </span>
                </p>
                <p class="return-reason">Lý do: {{ ret.reason }}</p>
            </div>
            <p>Mô tả: {{ ret.description }}</p>
            <router-link class="d-block" :to="{
                name: 'purchase.detail',
                params: { id: ret.id },
            }" v-if="ret.order">
                <div class="purchase-content">
                    <div class="purchase-item" v-for="product in ret.return_product" :key="product.id">
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
            <hr>
            <div class="return-image">
                <span v-for="image in ret.return_image" :key="image">
                    <img :src="image.image" alt="">
                </span>
            </div>
            <div class="purchase-btn">
                <div class="purchase-price__item">
                    <p>Thành tiền: </p>
                    <p>{{ formatPrice(ret.total_price) }}</p>
                </div>
                <div class="purchase-price__item">
                    <p>Phương thức thanh toán: </p>
                    <p>Tài khoản ngân hàng</p>
                </div>
                <div class="purchase-price__item">
                    <p class="fw-bold">Số tiền được hoàn trả: </p>
                    <p class="total-price">{{ formatPrice(ret.total_price) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ReturnService from "@/services/user/return.service";
import { formatPrice } from '@/utils';

export default {
    components: {

    },
    data() {
        return {
            returns: []
        };
    },
    methods: {
        formatPrice,
        async retrieveReturns() {
            try {
                this.returns = await ReturnService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async cancelReturn(ret) {
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
            await ReturnService.cancelReturn(ret);
            this.retrieveReturns();
            Toast.fire({
                    icon: 'success',
                    title: 'Hủy yêu cầu Trả hàng/Hoàn tiền thành công.'
                });
        }
    },
    mounted() {
        this.retrieveReturns();
    },
};
</script>

<style scoped>
.return-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.return-status .text-status {
    color: #12b712;
    font-weight: bold;
    text-decoration: underline;
}

.return-reason {
    color: #d20000 !important;
}

.return-image span {
    width: 150px;
    margin-right: 10px;
}
.return-cancel {
    display: flex;
    justify-content: space-between;
}
.return-cancel .btn {
    background-color: #c70404 !important;
    padding: 10px 14px !important;
    border-radius: 6px !important;
}
</style>