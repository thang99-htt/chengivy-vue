<template>
    <div class="product-suggest" v-if="recommendedProducts && recommendedProducts.length > 0">
      <h3>Có thể bạn thích</h3>
      <div class="brands section">
        <div class="brands-logo-wrapper">
          <div v-if="sliderReady" ref="suggest" class="suggests-logo-carousel d-flex align-items-center justify-content-between">
            <div class="brand-logo" v-for="product in recommendedProducts" :key="product">
                <div class="single-product">
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
                            <h4 class="title">
                                <a href="#">{{ product.product_info.name }}</a>
                            </h4>
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
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { formatPrice } from '@/utils';
  import axios from 'axios';
  import 'tiny-slider/dist/tiny-slider.css';
  import { tns } from 'tiny-slider/src/tiny-slider';
  
  export default {
    props: {
      product: { type: Object, required: true },
    },
    data() {
      return {
        recommendedProducts: [],
        sliderReady: false,
      };
    },
    watch: {
      product(newProduct) {
        this.retrieveProducts(newProduct.name);
      },
      recommendedProducts(newRecommendedProducts) {
        if (newRecommendedProducts.length > 0 && !this.sliderReady) {
          this.sliderReady = true;
          this.$nextTick(() => {
            this.initializeSuggest();
          });
        }
      },
    },
    methods: {
      formatPrice,
      async retrieveProducts(product) {
        try {
          const postData = {
            fav_product: product,
          };
  
          const response = await axios.post('http://127.0.0.1:5000/recommend', postData);
          this.recommendedProducts = response.data.recommendations;
        } catch (error) {
          console.error('Error fetching recommended products:', error);
        }
      },
      initializeSuggest() {
        const suggest = this.$refs.suggest;
        if (suggest) {
          new tns({
            container: suggest,
            autoplay: true,
            autoplayButtonOutput: false,
            mouseDrag: true,
            gutter: 15,
            nav: false,
            controls: true,
            responsive: {
              0: {
                items: 1,
              },
              540: {
                items: 3,
              },
              768: {
                items: 5,
              },
              992: {
                items: 6,
              },
            },
            controlsText: [
              '<i class="fa fa-chevron-left"></i>',
              '<i class="fa fa-chevron-right"></i>',
            ],
          });
        }
      },
    },
    mounted() {
      this.retrieveProducts(this.product.name);
    },
  };
  </script>
  
  <style scoped>
  .product-suggest h3 {
    font-weight: bold;
  }
  .suggests-logo-carousel .brand-logo img {
    max-width: 100%;
    height: 200px;
  }
  .brands {
    padding: 30px 20px;
  }
  .brands .brands-logo-wrapper {
    border: 0;
  }
  .single-product {
    max-height: 290px;
    height: 290px;
  }
  .single-product .price span {
    font-size: 15px;
  }
  .single-product .product-info {
    padding: 12px;
  }
  </style>
  