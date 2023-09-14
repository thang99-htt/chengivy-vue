<template>
    <div class="product-suggest" v-if="recommendedProducts">
        <h3>Có thể bạn thích</h3>
        <div class="suggest-list">
            <div class="single-product"
                v-for="product in recommendedProducts" :key="product"
            >
                <div class="product-image">
                    <router-link :to="{
                        name: 'product.detail',
                        params: { id: product.id },
                    }">
                        <img :src="product.product_info.image" alt="#" />
                    </router-link>
                </div>
                <router-link :to="{
                    name: 'product.detail',
                    params: { id: product.id },
                }">
                    <div class="product-info">
                        <div class="price">
                            <span v-if="product.product_info.discount_percent>0" 
                                class="text-decoration-line-through text-secondary me-3">
                                {{ formatPrice(product.product_info.price) }}
                            </span>
                            <span :class="{'text-danger': product.product_info.discount_percent>0}">
                                {{ formatPrice(product.product_info.price) }}
                            </span>
                        </div>
                    </div>
                </router-link>
                <div class="product-item__sale" v-if="product.product_info.discount_percent>0">
                    <span>GIẢM {{ product.product_info.discount_percent }}%</span>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import { formatPrice } from '@/utils';
import axios from 'axios';
    export default {
        props: {
            product: { type: Object, required: true },
        },
        data() {
            return {
                recommendedProducts: [],
            };
        },
        computed: {
            
        },
        watch: {
            'product'(newProduct) {
                    this.retriveProducts(newProduct.name)
                },
            // ...
        },
        methods: {
            formatPrice,
            async retriveProducts(product) {
                try {
                    const postData = {
                        'fav_product': product, 
                    };
                    
                    const response = await axios.post('http://127.0.0.1:5000/recommend', postData);
                    this.recommendedProducts = response.data.recommendations;
                } catch (error) {
                    console.error('Error fetching recommended products:', error);
                }
            },
        },
        mounted() {
            this.retriveProducts(this.product.name);
        }
    };
</script>
<style scoped>
    .product-suggest h3 {
        font-weight: bold;
    }
    .product-suggest .suggest-list {
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        width: 100%;
    }
    .single-product {
        height: 330px !important;
        width: calc(20% - 10px) !important;
        margin-right: 10px;
        position: relative;
    }
    .single-product .product-image img {
        height: 280px;
        width: 250px;
    }
    .single-product .product-info {
        padding: 10px;
    }
</style>