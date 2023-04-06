<template>
    <div class="table-responsive overflow-hidden p-3">
        <div class="row">
            <div class="col-8">
                <table
                    class="table table-hover"
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
                                    <input type="hidden" name="cart_product_id" id="" :value="cart.product_id">
                                    <router-link 
                                        :to="{
                                            name: 'product.detail',
                                            params: { id: cart.product.id },
                                        }" 
                                        class="text-dark"
                                    >
                                        {{ cart.product.name }}
                                    </router-link>
                                    <input type="hidden" name="cart_size_id" id="" :value="cart.size.id">
                                    <p>Size: {{ cart.size }}</p>
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
                                <input class="quantity" min="1" name="cart_quantity" :value="cart.quantity" type="number">
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
                        {{ formatPrice(carts.into_money) }} VĐN
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-6">
                        <p>Tổng đơn đặt hàng</p>
                    </div>
                    <div class="col-6">
                        {{ formatPrice(carts.into_money) }} VĐN
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
    import {mapGetters} from 'vuex';
    
    export default {
        name: 'CartList',
        props: {
            carts: { type: Array, default: [] },
        },
        methods: {
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            reduce(cart) {
                if (cart.quantity > 1) {
                    try {
                        cart.quantity--;
                        CartService.updateQuantity(cart.id, cart.quantity)
                        .then( async (response) => {
                            this.$store.commit('addToCart', await CartService.getCart(this.user.id));
                        })                  

                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            increase(cart) {
                try {
                    cart.quantity++;
                    CartService.updateQuantity(cart.id, cart.quantity)
                    .then( async (response) => {
                        this.$store.commit('addToCart', await CartService.getCart(this.user.id));
                    })                  

                } catch (error) {
                    console.log(error);
                } 
            },
            formatPrice(value) {
                let val = (value/1).toFixed(2)
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            deleteProduct(id) {
                Swal.fire({
                    title: 'Bạn có chắc?',
                    text: "Bạn sẽ không thể hoàn tác lại điều này!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy'
                }).then((result) => {
                    if (result.value) {
                        CartService.delete(id).then(async (res) => {
                            if(res.success) {
                                this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
                            }
                        })
                        Swal.fire('Đã xóa thành công!','','success');
                        
                    }
                })
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
    background-color: #0167f3;
 }

 .checkout a {
    color: #fff;
    display: flex;
    justify-content: center;
 }
</style>