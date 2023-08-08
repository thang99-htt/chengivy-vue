<script>
import ProductService from "@/services/user/product.service";
import 'datatables.net'
import 'datatables.net-bs'
import { formatPrice, getImage } from '@/utils';

export default {
    name: 'ProductBestSeller',
    props: {
        products: { type: Array, default: [] },
    },
    mounted() {
        ProductService.getType().then((response) => {
            this.products = response;
        });
    },
    data() {
        return {
            products: [],
        };
    },
    methods: {
        getImage,
        async retrieveProducts() {
            try {
                this.products = await ProductService.getType();
            } catch (error) {
                console.log(error);
            }
        },
        formatPrice,
    },

};


</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="section-title">
                    <h2 class="title">Bán chạy nhất</h2>
                </div>
            </div>
        </div>
        <div class="row pb-5">
            <div 
                class="col-lg-3 col-md-4 col-12" 
                v-for="(product, index) in products.bestSellerProducts" :key="product"
            >
                <div class="single-product">
                    <div class="product-image">
                        <router-link :to="{
                            name: 'product.detail',
                            params: { id: product.id },
                        }">
                            <img :src="getImage(product.image)" alt="#" />
                        </router-link>
                        <div class="product-item__favorite" @click="toggleFavorite(product)">
                            <span class="product-item__favorite-item">
                                <i class="bi bi-heart"></i>
                            </span>
                        </div>
                        <div class="button">
                            <a v-if="product.deleted_at" href="" class="btn"><i class="fa fa-cart"></i>Ngừng kinh
                                doanh</a>
                            <a v-else @click="addToCart(product)" class="btn"><i class="fa fa-cart"></i>Thêm vào giỏ
                                hàng</a>
                        </div>
                    </div>
                    <router-link :to="{
                        name: 'product.detail',
                        params: { id: product.id },
                    }">
                        <div class="product-info">
                            <span class="category">{{ product.brand.name }}</span>
                            <h4 class="title">
                                <a href="#">{{ product.name }}</a>
                            </h4>
                            <ul class="review">
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><span>(123)</span></li>
                            </ul>
                            <div class="price">
                                <span>
                                    {{ formatPrice(product.price_final) }}
                                </span>
                                <span class="text-decoration-line-through float-end text-secondary"
                                    v-if="product.discount_percent > 0">
                                    {{ formatPrice(product.price) }}
                                </span>
                            </div>
                        </div>
                    </router-link>
                    <div class="product-item__sale">
                        <span v-if="product.discount_percent > 0">GIẢM {{ product.discount_percent }}%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.single-banner.right .content:hover {
    height: 1000px;
}
</style>