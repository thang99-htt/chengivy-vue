<template>
    <section class="mt-4 mb-5">
        <div v-if="product">
            <div class="detail">
                <div class="container">
                    <div class="row">
                        <div class="col-6">
                            <ProductDetailImage
                                :product="product"
                            /> 
                        </div>
                        <div class="col-6">
                            <ProductDetailInfor
                                :product="product"
                            />
                            <ProductDetailAddCart
                                :product="product"
                                :cart="cart"
                                @submit:cart="addToCart"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <ProductDetailReview
                            :product="product"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import ProductDetailImage from "@/components/user/products/ProductDetailImage.vue";
    import ProductDetailInfor from "@/components/user/products/ProductDetailInfor.vue";
    import ProductDetailAddCart from "@/components/user/products/ProductDetailAddCart.vue";
    import ProductDetailReview from "@/components/user/products/ProductDetailReview.vue";

    import ProductService from "@/services/user/product.service";
    import CartService from "@/services/user/cart.service";
    import ReviewService from "@/services/user/review.service";
    
    import {mapGetters} from 'vuex';

    
    export default {
        components: {
            ProductDetailImage,
            ProductDetailInfor,
            ProductDetailAddCart,
            ProductDetailReview
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                product: null,
                cart: {
                    'product_id': this.id,
                    'size': "",
                    'quantity': 1,
                },
            };
        },
        methods: {
            async getProduct(id) {
                try {
                    this.product = await ProductService.getDetail(id);
                    // console.log(this.cart.size);
                } catch (error) {
                    console.log(error);
                    // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                    this.$router.push({
                        name: "notfound",
                        params: {
                            pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },
            async addToCart(data) {
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
                    if(this.getUser) {
                        await CartService.create(this.getUser.id, data).then(async (response) => {
                            if(response == true) {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Sản phẩm đã được thêm vào giỏ hàng.'
                                });
                                this.$store.commit('addToCart', await CartService.getCart(this.getUser.id, data.id));
                                
                            } else {
                                this.$swal.fire({
                                    icon: 'warning',
                                    text: response.message
                                    }
                                )
                            }
                            // console.log(response);
                        });
                    } else {
                        Toast.fire({
                            icon: 'warning',
                            title: 'Bạn phải là thành viên.'
                        });
                        this.$router.push({ name: "login" });
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        },
        created() {
            this.getProduct(this.id);
        },
        computed: {
            ...mapGetters(['getUser'])
        }
    };
</script>
