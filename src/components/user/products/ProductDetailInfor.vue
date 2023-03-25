<template>
    <div class="detail-info">
        <div class="info-name">
            <h3>{{ product.name }}</h3>
        </div>
        <div class="info-category">
            <p>{{ product.category.name }}</p>
        </div>
        <div class="info-price">
            <p>{{ formatPrice(product.final_price) }} VNĐ</p>
        </div>
        <hr>
        <div class="info-des">
            <p>{{ product.description }}</p>
        </div>
    </div>
</template>
<script>
    import { formatPrice } from '../../../shared';

    export default {
        props: {
            product: { type: Object, required: true },
        },
        methods: {
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        }
    };
</script>

