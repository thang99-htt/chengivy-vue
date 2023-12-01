<template>
    <section class="mt-4 mb-5">
        <div v-if="product">
            <div class="detail">
                <div class="container">
                    <div class="row">
                        <div class="liveAlert"></div>
                        <div class="col-7">
                            <ProductDetailImage
                                :product="product"
                                :isColorSelected="isColorSelected"
                            /> 
                        </div>
                        <div class="col-5">
                            <ProductDetailInfor
                                :product="product"
                                v-model:isColorSelected="isColorSelected"
                                :inventoryLocal="inventoryLocal"
                                :cart="cart"
                            />
                            <ProductDetailAddCart
                                :product="product"
                                :inventoryLocal="inventoryLocal"
                                :cart="cart"
                                :inventory="inventory"
                                :isColorSelected="isColorSelected"
                                @submit:cart="addToCart"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <ProductDetailSuggest
                            :product="product"
                        />
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
    import ProductDetailSuggest from "@/components/user/products/ProductDetailSuggest.vue";

    import ProductService from "@/services/admin/product.service";
    import CartService from "@/services/user/cart.service";
    
    import {mapGetters} from 'vuex';
    import { showAlert } from '@/utils';
    
    export default {
        components: {
            ProductDetailImage,
            ProductDetailInfor,
            ProductDetailAddCart,
            ProductDetailReview,
            ProductDetailSuggest
        },
        props: {
            id: { type: String, required: true },
        },
        watch: {
            '$route.params.id'(newId) {
                this.getProduct(newId);
            },
            inventoryLocal: {
                handler() {
                    this.findMatchingInventory();
                },
                deep: true, 
            },
        },
        data() {
            return {
                product: null,
                cart: {
                    'product_id': this.id,
                    'size_id': "",
                    'size_name': "",
                    'color_id': "",
                    "color_name": "",
                    'quantity': 1,
                },
                isColorSelected: null,
                inventoryLocal: {
                    'product_id': this.id,
                    'size_id': "",
                    'color_id': "",
                },
                inventory: null
            };
        },
        methods: {
            async getProduct(id) {
                try {
                    const response = await ProductService.getDetail(id);
                    this.product = response;
                    this.isColorSelected = (response.images)[0];
                    this.inventoryLocal.color_id = this.isColorSelected.color_id;

                    this.inventoryLocal.size_id = (response.inventories)[0].items.find(item => {
                        return item.color_id === this.isColorSelected.color_id && item.total_final !== 0;
                    }).size_id;

                    // Cart
                    this.cart.color_id = this.isColorSelected.color_id;
                    this.cart.color_name = this.isColorSelected.color_name;
                    this.cart.size_id = (response.inventories)[0].items.find(item => {
                        return item.color_id === this.isColorSelected.color_id && item.total_final !== 0;
                    }).size_id;
                    this.cart.size_name = (response.inventories)[0].items.find(item => {
                        return item.color_id === this.isColorSelected.color_id && item.total_final !== 0;
                    }).size_name;

                    this.inventoryLocal = {
                        'product_id': this.id,
                        'size_id': this.inventoryLocal.size_id,
                        'color_id': this.inventoryLocal.color_id,
                    },
                    this.findMatchingInventory();
                } catch (error) {
                    console.log(error);
                }
            },
            findMatchingInventory() {
                this.inventory = null;
                for (const item of (this.product.inventories)[0].items) {
                    if (
                        item.product_id == this.inventoryLocal.product_id &&
                        item.size_id == this.inventoryLocal.size_id &&
                        item.color_id == this.inventoryLocal.color_id
                    ) {
                        this.inventory = item;
                    }
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
                            showAlert(response);
                            this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
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
            ...mapGetters(['getUser']),
        }
    };
</script>
