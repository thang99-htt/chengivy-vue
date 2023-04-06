<template>
    <section class="mt-4 mb-5">
        <div v-if="product">
            <div class="detail">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-8">
                            <ProductDetailImage
                                :product="product"
                            /> 
                        </div>
                        <div class="col-4">
                            <ProductDetailInfor
                                :product="product"
                            />
                            <ProductDetailAddCart
                                :product="product"
                                :cart="cart"
                                @submit:cart="addToCart"
                            />
                            {{ carts }}
                        </div>
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

    import ProductService from "@/services/user/product.service";
    import CartService from "@/services/user/cart.service";
    
    import {mapGetters} from 'vuex';

    
    export default {
        components: {
            ProductDetailImage,
            ProductDetailInfor,
            ProductDetailAddCart
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
                    console.log(this.cart.size);
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
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                try {
                    await CartService.create(this.getUser.id, data).then(async (response) => {
                        if(response == true) {
                            Toast.fire({
                                icon: 'success',
                                title: 'Sản phẩm đã được thêm vào giỏ hàng.'
                            });
                            this.$store.commit('addToCart', await CartService.getCart(this.getUser.id, data.id));
                            
                        } else if (response == false) {
                            Toast.fire({
                                icon: 'warning',
                                title: 'Số lượng của sản phẩm này đã được bán hết.'
                            });
                        }
                        // console.log(response);
                    });
                } catch (error) {
                    Toast.fire({
                        icon: 'warning',
                        title: 'Bạn phải là thành viên.'
                    });
                    this.$router.push({ name: "login" });
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
