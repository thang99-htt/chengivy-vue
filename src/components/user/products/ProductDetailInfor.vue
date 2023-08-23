<template>
    <div class="detail-info">
        <div class="info-category">
            <p>{{ product.brand }}</p>
        </div>
        <div class="info-name">
            <h3>{{ product.name }}</h3>
        </div>
        <div class="info-price">
            <div class="price">
                <span :class="{'text-danger': product.discount_percent}">{{ formatPrice(product.price_final) }}</span>
                <span 
                    class="text-decoration-line-through text-secondary ms-4"
                    v-if="product.discount_percent"
                >
                    {{ formatPrice(product.price) }}
                </span>
            </div>
            <ul class="review">
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><span>(123)</span></li>
            </ul>
        </div>
        <div class="info-color">
            <span v-for="(color, index) in (product.images)" :key="color"
                class="filters-panel-group-item__item-box circle" 
                :class="{'active': color.color === isColorSelected.color}"
                :style="`background-color: ${color.color}`"
                @click="changeColor(color)"
            >
            </span>
        </div>
        <hr>
        <div class="info-des">
            <p>{{ product.description }}</p>
        </div>
    </div>
</template>
<script>
import { formatPrice } from '@/utils';

export default {
    props: {
        product: { type: Object, required: true },
        isColorSelected: { type: Object, required: true },
        inventoryLocal: { type: Object, required: true },
        cart: { type: Object, required: true },
    },
    methods: {
        formatPrice,
        changeColor(color) {
            const colorId = color.color_id;
            const selectedColor = this.product.images.find(item => item.color_id === colorId);
            this.$emit('update:isColorSelected', selectedColor);
            this.inventoryLocal.color_id = color.color_id;

            this.inventoryLocal.size_id = (this.product.inventories)[0].items.find(item => {
                return item.color_id === colorId && item.total_final !== 0;
            }).size_id;


            this.cart.color_id = colorId;
            this.cart.size_id = ((this.product.inventories)[0].items).find(item => {
                return item.color_id === colorId && item.total_final !== 0;
            }).size_id;
        },
    }
};
</script>

