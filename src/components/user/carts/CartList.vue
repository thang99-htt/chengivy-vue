<template>
    <div class="table-responsive overflow-hidden p-3">
        <div class="row">
            <div class="liveAlert"></div>
            <div class="cart-info">
                <table class="table">
                    <thead>
                        <tr>
                            <th width="50%">Sản phẩm</th>
                            <th width="15%">Đơn giá</th>
                            <th width="20%">Số lượng</th>
                            <th width="15%">Số tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cart, index) in cartAvailable" :key="cart">
                            <td>
                                <div class="d-flex">
                                    <div class="me-4">
                                        <router-link :to="{
                                            name: 'product.detail',
                                            params: { id: cart.product_id },
                                        }" class="text-dark">
                                            <img width="100" v-if="cart.image" :src="getImage(cart.image)" alt="" />
                                        </router-link>
                                    </div>
                                    <div class="product-info">
                                        <router-link :to="{
                                            name: 'product.detail',
                                            params: { id: cart.product_id },
                                        }" class="text-dark">
                                            {{ cart.product.name }}
                                        </router-link>
                                        <div class="info-size_change">
                                            <input type="hidden" name="cart_size_id" id="" :value="cart.size_id">
                                            <div class="info-size_change-text" @click="changeColorAndSize(cart)">
                                                <div>
                                                    Phân loại:
                                                    <button></button>
                                                </div>
                                                <div>{{ cart.color_name }}, {{ cart.size_name }}</div>
                                            </div>
                                            <div class="info-size_change-show" v-show="cart.showChangeSize">
                                                <div class="change-show_content">
                                                    <div class="change-show_option">
                                                        <div class="change-show_option-titile">Màu sắc:</div>
                                                        <button class="option-item" v-for="color in colors" :key="color"
                                                            :class="{ 'option-item--selected': color.color_id == cart.color_id }"
                                                            @click="selectColor(cart, color)">
                                                            {{ color.color_name }}
                                                            <div class="option-item__tick" v-if="color.color_id == cart.color_id">
                                                                <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12"
                                                                    x="0" y="0" class="icon-tick-bold">
                                                                    <g>
                                                                        <path
                                                                            d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z">
                                                                        </path>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div class="change-show_option">
                                                        <div class="change-show_option-titile">Kích cỡ:</div>
                                                        <button class="option-item" v-for="size in sizes" :key="size"
                                                            :class="{'option-item--selected': size.size_id == cart.size_id && !getOutStock.includes(size.size_id),
                                                            'option-item--out-stock': getOutStock.includes(size.size_id)}"
                                                            @click="selectSize(cart, size)">
                                                            {{ size.size_name }}
                                                            <div class="option-item__tick"
                                                                v-if="size.size_id == cart.size_id  && !getOutStock.includes(size.size_id)">
                                                                <svg enable-background="new 0 0 12 12" viewBox="0 0 12 12"
                                                                    x="0" y="0" class="icon-tick-bold">
                                                                    <g>
                                                                        <path
                                                                            d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z">
                                                                        </path>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div class="change-show_button">
                                                        <button class="cancel-btn"
                                                            @click="cart.showChangeSize = !cart.showChangeSize">Trở
                                                            Lại</button>
                                                        <button class="button-solid" @click="updateColorAndSize(cart)">Xác
                                                            nhận</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="text-decoration-line-through text-secondary me-3"
                                    v-if="cart.product.discount_percent > 0">
                                    {{ formatPrice(cart.product.price) }}
                                </span>
                                <span :class="{ 'text-danger': cart.product.discount_percent > 0 }">
                                    {{ formatPrice(cart.product.price_final) }}
                                </span>
                            </td>
                            <td>
                                <div class="number-input ms-0">
                                    <button @click="reduce(cart)">
                                        <i class="bi bi-dash"></i>
                                    </button>
                                    <input class="quantity" min="1" name="cart_quantity" :value="cart.quantity"
                                        type="number" @keyup.enter="updateQuantity($event, cart)">
                                    <button @click="increase(cart)" class="plus">
                                        <i class="bi bi-plus"></i>
                                    </button>
                                </div>
                            </td>
                            <td class="position-relative cart-option">
                                <p>{{ formatPrice(cart.total_price) }}</p>
                                <div class="position-absolute bottom-0 end-0">
                                    <button type="button" class="btn" @click="deleteCart(cart)">
                                        <i class="bi bi-heart"></i>
                                    </button>
                                    <button type="button" class="btn" @click="deleteCart(cart)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>

                        <tr v-for="(cart, index) in cartunavailable" :key="cart"  class="opacity-75">
                            <td>
                                <div class="d-flex">
                                    <div class="me-4">
                                        <router-link :to="{
                                            name: 'product.detail',
                                            params: { id: cart.product_id },
                                        }" class="text-dark">
                                            <img width="100" v-if="cart.image" :src="getImage(cart.image)" alt="" class="opacity-50"/>
                                        </router-link>
                                    </div>
                                    <div class="product-info">
                                        <router-link :to="{
                                            name: 'product.detail',
                                            params: { id: cart.product_id },
                                        }" class="text-dark">
                                            {{ cart.product.name }}
                                        </router-link>
                                        <div class="info-size_change">
                                            <input type="hidden" name="cart_size_id" id="" :value="cart.size_id">
                                            <div class="info-size_change-text" @click="changeColorAndSize(cart)">
                                                <div>
                                                    Phân loại:
                                                    <button></button>
                                                </div>
                                            </div>
                                            <div class="text-danger">Phân loại hàng này bán hết, vui lòng lựa chọn một phân loại khác.</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="text-center">
                                <span class="position-absolute bottom-0 me-5">{{ formatPrice(cart.product.price_final) }}</span>
                            </td>
                            <td class="text-center">
                                <span class="position-absolute bottom-0 me-5 text-danger">Hết hàng</span>
                            </td>
                            <td class="position-relative cart-option">
                                <div class="position-absolute bottom-0 end-0">
                                    <button type="button" class="btn" @click="deleteCart(cart)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="cart-sum provisional">
                <h5 class="fw-bold">TẠM TÍNH</h5>
                <div class="d-flex justify-content-between total">
                    <div>
                        <p>Thành tiền</p>
                    </div>
                    <div>
                        {{ formatPrice(carts.into_money) }}
                    </div>
                </div>
                <div class="d-flex justify-content-between total">
                    <div>Giảm giá</div>
                    <div>0</div>
                </div>
                <div class="d-flex justify-content-between mt-4">
                    <div>Tổng đơn đặt hàng</div>
                    <div>{{ formatPrice(carts.into_money) }}</div>
                </div>
                <hr>
                <div class="checkout">
                    <router-link :to="{
                        name: 'checkout',
                    }">
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
import { mapGetters } from 'vuex';
import { formatPrice, getImage, showAlert } from '@/utils';

export default {
    name: 'CartList',
    props: {
        carts: { type: Array, default: [] },
    },
    data() {
        return {
            showChangeSize: false,
            currentCart: null,
            sizes: [],
            colors: [],
            cart: {
                'user_id': "",
                'product_id': "",
                'color_id': "",
                'size_id': "",
                'quantity': "",
                'color_id_old': "",
                'size_id_old': "",
            },
            getOutStock: [],
            cartAvailable: [],
            cartunavailable: []
        }
    },
    methods: {
        formatPrice,
        getImage,
        async setCartItem(cart, quantity) {
            this.cart.user_id = this.getUser.id;
            this.cart.product_id = cart.product_id;
            this.cart.color_id = cart.color_id;
            this.cart.size_id = cart.size_id;
            this.cart.quantity = quantity;
            const response = await CartService.updateQuantity(this.cart);
            showAlert(response);
            this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
        },
        async reduce(cart) {
            if (cart.quantity > 1) {
                try {
                    cart.quantity--;
                    await this.setCartItem.call(this, cart, cart.quantity);
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async increase(cart) {
            try {
                cart.quantity++;
                await this.setCartItem.call(this, cart, cart.quantity);
            } catch (error) {
                console.log(error);
            }
        },
        async updateQuantity(event, cart) {
            try {
                const enteredValue = event.target.value;
                await this.setCartItem.call(this, cart, enteredValue);
            } catch (error) {
                console.log(error);
            }
        },
        getUniqueColorsAndSizes(product) {
            const uniqueSizes = [];
            const sizesSet = new Set();
            for (const size of Object.values(product.inventories)[0].items) {
                if (!sizesSet.has(size.size_name)) {
                    sizesSet.add(size.size_name);
                    uniqueSizes.push(size);
                }
            }
            this.sizes = uniqueSizes;

            const uniqueColors = [];
            for (const color of  Object.values(product.images)) {
                uniqueColors.push(color);
            }
            this.colors = uniqueColors;
        },
        filterByColor(inventories, color_id) {
            return inventories.filter(item => item.color_id == color_id);
        },
        async changeColorAndSize(cart) {
            if (this.currentCart !== null) {
                this.currentCart.showChangeSize = false; // Ẩn showChangeSize của cart trước đó
            }
            if (this.currentCart !== cart) {
                this.currentCart = cart; // Cập nhật currentCart thành cart mới
                this.currentCart.showChangeSize = true;

                await ProductService.getDetail(this.currentCart.product_id).then(res => {
                    this.getUniqueColorsAndSizes(res);
                });
            } else {
                this.currentCart = null; // Nếu nhấp vào cart đã chọn, ẩn cart hiện tại
            }

            this.getOutStock = [];
            const filteredInventories = this.filterByColor(cart.product.inventories, cart.color_id);
            filteredInventories.forEach(item => {
                if (item.total_final == 0) {
                    this.getOutStock.push(item.size_id);
                }
            });
        },
        selectSize(cart, size) {
            if(!this.getOutStock.includes(size.size_id)) {
                this.cart.size_id_old = cart.size_id;
                cart.size_id = size.size_id;
                this.cart.size_id = size.size_id;
            }
        },
        selectColor(cart, color) {
            this.cart.color_id_old = cart.color_id;
            cart.color_id = color.color_id;
            this.cart.color_id = color.color_id;

            this.getOutStock = [];
            const filteredInventories = this.filterByColor(cart.product.inventories, color.color_id);
            filteredInventories.forEach(item => {
                if (item.total_final == 0) {
                    this.getOutStock.push(item.size_id);
                }
            });
        },
        async updateColorAndSize(cart) {
            if(!this.cart.size_id && !this.cart.color_id) {
                this.currentCart.showChangeSize = false;
            } else {
                this.cart.user_id = this.getUser.id;
                this.cart.product_id = cart.product_id;
                this.cart.quantity = cart.quantity;
                if(!this.cart.size_id) {
                    this.cart.size_id = cart.size_id;
                }
                if(!this.cart.color_id) {
                    this.cart.color_id = cart.color_id;
                }
                if(!this.cart.size_id_old) {
                    this.cart.size_id_old = cart.size_id;
                }

                if(!this.cart.color_id_old) {
                    this.cart.color_id_old = cart.color_id;
                }
                console.log(this.cart)
                
                CartService.updateColorAndSize(this.cart).then(async (response) => {
                    this.cart.color_id = "";
                    this.cart.size_id = "";
                    this.cart.color_id_old = "";
                    this.cart.size_id_old = "";
                    this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
                    showAlert(response);
                });
            }

        },
        deleteCart(cart) {
            this.cart.user_id = this.getUser.id;
            this.cart.product_id = cart.product_id;
            this.cart.color_id = cart.color_id;
            this.cart.size_id = cart.size_id;
            CartService.delete(this.cart.user_id, this.cart.product_id, 
                this.cart.color_id, this.cart.size_id).then(async (response) => {
                showAlert(response);
                this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
            })
        },
    },
    computed: {
        ...mapGetters(['getUser', 'carts']),
        cartAvailable() {
            return this.carts.getCartItems.filter(cart => cart.inventory.total_final > 0);
        },
        cartunavailable() {
            return this.carts.getCartItems.filter(cart => cart.inventory.total_final == 0);
        }
    }
};
</script>

<style>
.checkout {
    background-color: #000;
    padding: 10px;
}

.checkout:hover {
    background-color: #2b2b2b;
}

.checkout a:hover {
    text-decoration: none;
}

.checkout a {
    color: #fff;
    display: flex;
    justify-content: center;
}

.cart-option button,
.cart-option button:hover {
    background-color: #dedede;
    margin-left: 10px;
    margin-bottom: 6px;
    padding: 4px 6px;
}

.cart-info {
    width: 70%;
}

.cart-sum {
    width: 25%;
    margin-left: 4%;
}

.cart-info .product-info {
    width: 220px;
}
</style>