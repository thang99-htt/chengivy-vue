<template>
    <div class="purchase-container">
        <div class="purchase-content">
            <div class="purchase-item" v-for="(product, index) in orderLocal" :key="product.id">
                <div class="purchase-info">
                    <div class="d-flex">
                        <img class="d-block me-3" width="100" :src="product.image" alt="">
                        <div>
                            <router-link :to="{
                                name: 'product.detail',
                                params: { id: product.id },
                            }" class="text-dark">
                                {{ product.name }}
                            </router-link>
                            <p>Size: {{ product.size }}</p>
                            <p>Màu sắc: {{ product.color }}</p>
                            <p>
                                <span class="me-1">{{ product.quantity }} x </span>
                                <span class="text-danger me-3"
                                    v-if="product.price_discount > 0">
                                    {{ formatPrice(product.price_discount) }}
                                </span>
                                <span :class="{ 'text-decoration-line-through': product.price_discount > 0 }">
                                    {{ formatPrice(product.price) }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="purchase-price">
                    <p v-if="product.price_discount > 0">{{ formatPrice(product.price_discount) }}</p>
                    <p v-else>{{ formatPrice(product.price) }}</p>
                </div>
            </div>
        </div>
        <hr>
        <div class="purchase-btn">
            <div class="purchase-price__item">
                <p>Tổng đơn đặt hàng: </p>
                <p>{{ formatPrice(order.total_price) }}</p>
            </div>
            <div class="purchase-price__item">
                <p>Phí vận chuyển: </p>
                <p>{{ formatPrice(order.fee) }}</p>
            </div>
            <div class="purchase-price__item">
                <p>Vourcher từ Chengigy: </p>
                <p>{{ formatPrice(order.total_discount) }}</p>
            </div>
            <div class="purchase-price__item">
                <p class="fw-bold">Thành tiền: </p>
                <p class="total-price">{{ formatPrice(order.total_value) }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { formatPrice } from '@/utils';

export default {
    props: {
        order: { type: Object, required: true },
        purchasesList: { type: Object, required: true },
    },

    data() {
        return {
            orderLocal: this.order.items,
        };
    },
    methods: {
        formatPrice,
    }
};
</script>
