<template>
    <div class="mt-4">
        <div class="cart-list list">
            <div class='container'>
                <div class="d-flex justify-content-between">
                    <h5 class="mb-4">
                        <svg class="d-inline me-2 bi bi-bag" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                        </svg>
                        <span>GIỎ HÀNG CỦA BẠN</span>
                        <span class="text-secondary fs-6 ms-1">({{ carts.count_item }} sản phẩm)</span>
                    </h5>
                </div>
                <CartList
                    v-if="carts.count_item>0"
                    :carts="carts"
                />
                <div v-else>
                    <div class="d-flex justify-content-center">
                        <img src="/images/cart/empty-cart.svg" alt="" />
                    </div>
                    <h6 class="text-center mt-4">Giỏ hàng trống!</h6>
                    <div class="d-flex justify-content-center">
                        <router-link 
                            :to="{name: 'home'}" 
                        >
                            <button class="btn btn-dark mt-4">
                                TIẾP TỤC MUA SẮM
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
        import CartList from "@/components/user/carts/CartList.vue";
        import {mapGetters} from 'vuex';

        export default {
            components: {
                CartList,
            },
            name: 'cart',
            methods: {
                formatPrice(value) {
                    let val = (value/1).toFixed(2)
                    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                },
            },
            computed: {
                ...mapGetters(['carts'])
            }
        };
        
</script>
    