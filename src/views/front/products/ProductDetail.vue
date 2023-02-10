<template>
    <section class="section mt-50">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import ProductDetailImage from "@/components/front/products/ProductDetailImage.vue";
    import ProductDetailInfor from "@/components/front/products/ProductDetailInfor.vue";
    import ProductDetailAddCart from "@/components/front/products/ProductDetailAddCart.vue";

    import ProductService from "@/services/front/product.service";
    import CartService from "@/services/front/cart.service";
    import store from "/src/vuex";
    import axios from 'axios';
    
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
                token: localStorage.getItem('token'),
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
                try {
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

                    await axios.get(`/api/user`, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }).then(async (response) => {
                        await CartService.create(response.data.id, data).then((response) => {
                            if(response == true) {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Sản phẩm đã được thêm vào giỏ hàng.'
                                })
                            } else if (response == false) {
                                Toast.fire({
                                    icon: 'warning',
                                    title: 'Số lượng không được phép.'
                                })
                            }
                            console.log(response)
                        });
                    });

                    

                } catch (error) {
                    console.log(error);
                }
            },
        },
        created() {
            this.getProduct(this.id);
        },
    };
</script>
