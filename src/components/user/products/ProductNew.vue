<script>
import ProductService from "@/services/admin/product.service";
import 'datatables.net'
import 'datatables.net-bs'
import { formatPrice } from '@/utils';

export default {
    name: 'ProductNew',
    props: {
        products: { type: Array, default: [] },
    },
    mounted() {
        ProductService.getType().then((response) => {
            this.products = response;
        });
        document.querySelector('.carousel-control-next').click();
    },
    data() {
        return {
            products: [],
        };
    },
    methods: {
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
                    <h2 class="title">Hàng mới về</h2>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
        <div id="carouselExampleControls" class="carousel slide slider-trending" data-bs-ride="carousel"
            data-bs-interval="1500">
            <div class="carousel-inner">
                <div v-for="(product, index) in products.newProducts" :key="product" class="single-slider carousel-item"
                    :class="{ 'active': index === 0 }"
                    :style="{ 'background-image': 'url(' + product.image + ')' }">
                    <div class="content">
                        <div class="product-info">
                            <span class="category">{{ product.brand.name }}</span>
                            <h4 class="title">
                                <router-link :to="{
                                    name: 'product.detail',
                                    params: { id: product.id },
                                }">
                                    {{ product.name }}
                                </router-link>
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
                                <span class="text-decoration-line-through float-end text-secondary ms-4"
                                    v-if="product.discount_percent > 0">
                                    {{ formatPrice(product.price) }} VNĐ
                                </span>
                                <span>{{ formatPrice(product.price_final) }} VNĐ</span>
                            </div>
                        </div>
                        <div class="button">
                            <router-link :to="{
                                name: 'product.detail',
                                params: { id: product.id },
                            }" class="btn">
                                Khám phá
                            </router-link>
                        </div>
                        <div class="image-detail">
                            <div class="image-item" v-for="(image, index) in  (product.images)[0].items" :key="image">
                                <img :src="image.image" class="d-block" alt="...">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

