<template>
    <div class="table-responsive overflow-hidden p-3">
        <div class="row">
            <div class="col-8">
                <table
                    class="table"
                >
                <thead>
                    <tr role="row">
                        <th colspan="1" rowspan="1" aria-controls="example1">Sản phẩm</th>
                        <th colspan="1" rowspan="1" aria-controls="example1">Đơn giá</th>
                        <th colspan="1" rowspan="1" aria-controls="example1">Số lượng</th>
                        <th colspan="1" rowspan="1" aria-controls="example1">Số tiền</th>
                    </tr>
                </thead>
                <tbody> 
                    <tr role="row"
                        v-for="(cart, index) in carts.getCartItems"
                        :key="cart"
                    >
                        <td>
                            <div class="d-flex">
                                <div class="me-4">
                                    <router-link 
                                        :to="{
                                            name: 'product.detail',
                                            params: { id: cart.product.id },
                                        }" 
                                        class="text-dark"
                                    >
                                        <img width="100" v-if="cart.product.image" :src="getImage(cart.product.image)" alt="" />    
                                    </router-link>
                                </div>
                                <div>
                                    <router-link 
                                        :to="{
                                            name: 'product.detail',
                                            params: { id: cart.product.id },
                                        }" 
                                        class="text-dark"
                                    >
                                        {{ cart.product.name }}
                                    </router-link>
                                    <div class="info-size_change">
                                        <input type="hidden" name="cart_size_id" id="" :value="cart.size.id">
                                        <div class="info-size_change-text" @click="changeSize(cart)">
                                            Size: {{ cart.size }}
                                            <button></button>
                                        </div>
                                        <div class="info-size_change-show" v-show="cart.showChangeSize">
                                            <div class="change-show_content">
                                                <div class="change-show_option">
                                                    <div class="change-show_option-titile">Kích cỡ:</div>
                                                    <button 
                                                        class="option-item"
                                                        v-for="size in sizes" :key="size"
                                                        :class="{'option-item--selected': size.size_name == cart.size}"
                                                        @click="selectSize(cart, size)"
                                                    > 
                                                        {{ size.size_name }}
                                                        <div class="option-item__tick" v-if="size.size_name == cart.size">
                                                            <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" class="icon-tick-bold"><g>
                                                                <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
                                                            </g></svg>
                                                        </div>
                                                    </button>
                                                </div>
                                                <div class="change-show_button">
                                                    <button class="cancel-btn" @click="cart.showChangeSize = !cart.showChangeSize">Trở Lại</button>
                                                    <button class="button-solid" @click="updateSize(cart)">Xác nhận</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </td>
                        <td >{{ formatPrice(cart.final_price) }}</td>
                        <td>
                            <div class="number-input ms-0">
                                <button @click="reduce(cart)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                    </svg>
                                </button>
                                <input class="quantity" min="1" name="cart_quantity" :value="cart.quantity" type="number" @keyup.enter="updateQuantity($event, cart)">
                                <button @click="increase(cart)" class="plus">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                    </svg>
                                </button>
                            </div>
                        </td>
                        <td class="position-relative">   
                            <p>{{ formatPrice(cart.total_price) }}</p>    
                            <div class="position-absolute bottom-0 right-0">
                                <button
                                    type="button"
                                    class="me-2 btn"
                                    @click="deleteProduct(cart.id)"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </button>
                            </div> 
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div class="col-4 provisional">
                <h6>TẠM TÍNH</h6>
                <div class="row total mt-2">
                    <div class="col-6">
                        <p>Thành tiền</p>
                    </div>
                    <div class="col-6">
                        {{ formatPrice(carts.into_money) }}
                    </div>
                </div>
                <div class="row total mt-2">
                    <div class="col-6">
                        <p>Giảm giá</p>
                    </div>
                    <div class="col-6">
                        0
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-6">
                        <p>Tổng đơn đặt hàng</p>
                    </div>
                    <div class="col-6">
                        {{ formatPrice(carts.into_money) }}
                    </div>
                </div>
                <hr>
                <div class="checkout">
                    <router-link 
                        :to="{
                            name: 'checkout',
                        }" 
                    >
                        THANH TOÁN    
                    </router-link>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
    import CartService from "@/services/user/cart.service";
    import ProductService from "@/services/user/product.service";
    import {mapGetters} from 'vuex';
    import { formatPrice, getImage } from '@/utils';
    
    export default {
        name: 'CartList',
        props: {
            carts: { type: Array, default: [] },
        },
        data() {
            return {
                showChangeSize: false,
                currentCart: null, 
                sizes: []
            }
        },        
        methods: {
            formatPrice,
            getImage,
            async reduce(cart) {
                if (cart.quantity > 1) {
                    try {
                        cart.quantity--;
                        CartService.updateQuantity(cart.id, cart.quantity).then( async (response) => {
                            if(response.success == false) {
                                this.$swal.fire({
                                    icon: 'warning',
                                    text: response.message
                                    }
                                )
                            } else {
                                this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
                            }
                        });

                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            async increase(cart) {
                try {
                    cart.quantity++;
                    CartService.updateQuantity(cart.id, cart.quantity).then( async (response) => {
                        if(response.success == false) {
                            this.$swal.fire({
                                icon: 'warning',
                                text: response.message
                                }
                            )
                        } else {
                            this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
                        }
                    });

                } catch (error) {
                    console.log(error);
                } 
            },
            async updateQuantity(event, cart) {
                try {
                    const enteredValue = event.target.value;
                    CartService.updateQuantity(cart.id, enteredValue).then( async (response) => {
                        if(response.success == false) {
                            this.$swal.fire({
                                icon: 'warning',
                                text: response.message
                                }
                            )
                        } else {
                            this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
                        }
                    });
                } catch (error) {
                    console.log(error);
                } 
            },
            async changeSize(cart) {
                if (this.currentCart !== null) {
                    this.currentCart.showChangeSize = false; // Ẩn showChangeSize của cart trước đó
                }
                if (this.currentCart !== cart) {
                    this.currentCart = cart; // Cập nhật currentCart thành cart mới
                    this.currentCart.showChangeSize = true;

                    await ProductService.getDetail(this.currentCart.product_id).then(res => this.sizes = res.sizes);
                } else {
                    this.currentCart = null; // Nếu nhấp vào cart đã chọn, ẩn cart hiện tại
                }
            },
            selectSize(cart, size) {
                cart.size = size.size_name;
            },
            async updateSize(cart) {
                CartService.updateSize(cart.id, cart.size, cart.quantity).then(res => {
                    if(res.success == false) {
                        this.$swal.fire({
                            icon: 'warning',
                            text: res.message
                            }
                        )
                    }
                });
                this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
            },
            deleteProduct(id) {
                CartService.delete(id).then(async (res) => {
                    if(res.success) {
                        this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
                    }
                })
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
                Toast.fire({
                    icon: 'success',
                    title: 'Sản phẩm đã được xoá khỏi giỏ hàng.'
                });
            },
        },
        computed: {
            ...mapGetters(['getUser', 'carts'])
        }
    };
</script>

<style>
 .checkout {
    background-color: #000;
    padding: 10px;
    margin-top: 20px;
 }

 .checkout:hover {
    background-color: #2b2b2b;
 }

 .checkout a {
    color: #fff;
    display: flex;
    justify-content: center;
 }
</style>