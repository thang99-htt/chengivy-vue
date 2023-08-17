<template>
    <div class="dash_blog">
        <div class="dash_blog_inner">
            <div class="dash_head">
                <h3>KIỂM TRA VÀ THANH TOÁN</h3>
            </div>
            <Form
                @submit="submitOrder"
            >
                <div class="row">
                    <div class="col-6">
                        <div class="list_cont">
                            <p>Hình thức thanh toán</p>
                        </div>
                        <div class="dash_main item mb-3">
                            <div 
                                class="form-check"
                                v-for="(payment, index) in payments"
                                :key="payment"
                            >
                                <Field name="payment" type="radio" :value="payment.id" v-model="orderLocal.payment_method_id"/>
                                <label class="form-check-label ms-2" for="exampleRadios1">
                                    <img :src="payment.image" width="25" alt="">
                                    {{ payment.description }}
                                </label>
                            </div>
                        </div>
                        <div class="list_cont">
                            <p>Gửi đến</p>
                        </div>
                        <div
                            class="dash_main ps-5"
                        >
                            <div>
                                <span class="acc-name">{{ order.delivery_address.name }}</span>
                                <span>{{ order.delivery_address.phone }}</span>
                            </div>
                            <div>
                                {{ order.delivery_address.address_detail }}
                            </div>
                            <div>
                                {{ order.delivery_address.address }}
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="view-product">
                            <div class="product-items">                                
                                <div class="shopping-item" v-if="!productBuyNow">
                                    <div class="text-dark text-bold">
                                        <span>{{ cartAvailable.length }} sản phẩm</span>
                                    </div>
                                    <hr>
                                    <ul class="shopping-list">
                                        <li 
                                            v-for="(cart, index) in cartAvailable"
                                            :key="cart"
                                        >  
                                            <div class="product-img-head">
                                                <a class="cart-img" href="product-details.html">
                                                    <img v-if="cart.image" :src="cart.image" alt="#" />
                                                </a>
                                            </div>
                                            <div class="">
                                                <h6><a href="product-details.html">{{ cart.product.name }}</a></h6>
                                                <p>Size: {{ cart.size_name }}</p>
                                                <p class="quantity">
                                                    <span class="me-1">{{ cart.quantity }} x </span>
                                                    <span :class="{ 'text-danger': cart.product.discount_percent > 0 }">
                                                         {{ formatPrice(cart.product.price_final) }}
                                                    </span>
                                                    <span class="text-decoration-line-through text-secondary ms-3"
                                                        v-if="cart.product.discount_percent > 0">
                                                        {{ formatPrice(cart.product.price) }}
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                    <hr>
                                    <div class="bottom mt-4">
                                        <div class="total">
                                            <span>Tổng tiền</span>
                                            <span class="total-amount">{{ formatPrice(cartLocal.into_money) }}</span>
                                        </div>
                                        <div class="total">
                                            <span>Phí vận chuyển</span>
                                            <span class="total-amount">25.000 VNĐ</span>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="bottom mt-4">
                                        <div class="total">
                                            <span>Tổng đơn đặt hàng</span>
                                            <span class="total-amount">{{ formatPrice(cartLocal.into_money + 25000) }}</span>
                                        </div>
                                        <Field    
                                            hidden
                                            name="order_total_price" type="number"
                                            class="form-control select" id="order_total_price"
                                           :value="((cartLocal.into_money+25000)/23795).toFixed()"
                                        />
                                    </div>
                                    
                                    <div v-show="orderLocal.payment_id == 3 && paymentStatus !== 'paid'" class="w-75 mx-auto mt-4 text-center">
                                        <div ref="paypal"></div>
                                    </div>
                                </div>
                                <div class="shopping-item" v-else>
                                    <div class="text-dark text-bold">
                                        <span> 1 sản phẩm</span>
                                    </div>
                                    <hr>
                                    <ul class="shopping-list">
                                        <li>  
                                            <div class="product-img-head">
                                                <a class="cart-img" href="product-details.html">
                                                    <img v-if="productBuyNow.image" :src="productBuyNow.image" alt="#" />
                                                </a>
                                            </div>
                                            <div class="">
                                                <h6><a href="product-details.html">{{ productBuyNow.name }}</a></h6>
                                                <p>Size: {{ productBuyNow.sizes[0].size_name }}</p>
                                                <p class="quantity">
                                                   1 x - {{ formatPrice(productBuyNow.final_price) }}
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                    <hr>
                                    <div class="bottom mt-4">
                                        <div class="total">
                                            <span>Tổng tiền</span>
                                            <span class="total-amount">{{ formatPrice(productBuyNow.final_price) }}</span>
                                        </div>
                                        <div class="total">
                                            <span>Phí vận chuyển</span>
                                            <span class="total-amount">25.000 VNĐ</span>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="bottom mt-4">
                                        <div class="total">
                                            <span>Tổng đơn đặt hàng</span>
                                            <span class="total-amount">{{ formatPrice(productBuyNow.final_price + 25000) }}</span>
                                        </div>
                                        <Field    
                                            hidden
                                            name="order_total_price" type="number"
                                            class="form-control select" id="order_total_price"
                                           :value="((productBuyNow.final_price+25000)/23795).toFixed()"
                                        />
                                    </div>
                                    
                                    <div v-show="orderLocal.payment_id == 3 && paymentStatus !== 'paid'" class="w-75 mx-auto mt-4 text-center">
                                        <div ref="paypal"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
    import PaymentMethodService from "@/services/admin/payment-method.service";
    import ProductService from "@/services/user/product.service";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import { formatPrice } from '@/utils';
    import {mapGetters} from 'vuex';

    export default {
        name: 'Header',
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        props: {
            order: { type: Object, required: true },
            carts: { type: Object, required: true },
        },
        data() {
            return {
                payments: [],
                cartLocal: this.carts,
                orderLocal: this.order,
                paymentStatus: '',
                cartAvailable: [],
            };
        },
        mounted: function() {
            this.refreshList();
            const script = document.createElement("script");
            script.src = "https://www.paypal.com/sdk/js?client-id=AT5pO4SLjEoDt65gg6gzPGMAp4Ml1XpOkoeWr7_G-qa3moiSJJFkdqDIBxh1ytFYbCLXHRoT1MsJSur1";
            script.addEventListener("load", this.setLoaded);
            document.body.appendChild(script);
        },
        emits: ["submit:order"],
        methods: {
            formatPrice,
            async retrievePaymentMethod() {
                try {
                    this.payments = await PaymentMethodService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrievePaymentMethod();
            },
            submitOrder() {
                this.$emit("submit:order", this.orderLocal);
            },
            setLoaded: function() {
                var order_total_price = $("#order_total_price").val();
                this.loaded = true;
                window.paypal
                    .Buttons({
                        createOrder: (data, actions) => {
                            return actions.order.create({
                            purchase_units: [
                                {
                                description: "Thanh toán Paypal",
                                amount: {
                                    currency_code: "USD",
                                    value: order_total_price
                                }
                                }
                            ]
                        });
                    },

                    style: {
                        size: 'large',
                        color: 'gold',
                        shape: 'pill',
                        tagline : 'false',
                    },

                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        this.orderLocal.paid = 1;
                        this.submitOrder();
                        this.paymentStatus = 'paid';
                        console.log(order);
                    },
                    onError: err => {
                        console.log(err);
                    }
                })
                .render(this.$refs.paypal);
            },
        }, 
        computed: {
            ...mapGetters(['productBuyNow']),
            cartAvailable() {
                return this.cartLocal.getCartItems.filter(cart => cart.inventory.total_final > 0);
            },
        },        
     };
</script>

<style>
    .dash_main label {
        font-weight: 400;
    }
    .product-items a,
    .product-items p,
    .product-items span {
        font-size: 13px;
    }
    .view-product .product-items .shopping-item {
        background: #fff;
        padding: 20px 25px;
        transition: all 0.3s ease 0s;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
    }
    @media (max-width: 767px) {
        .view-product .product-items .shopping-item {
            width: 250px;
        }
    }
    @media only screen and (min-width: 768px) and (max-width: 991px) {
        .view-product .product-items .shopping-item {
            top: 68px;
        }
    }
    @media (max-width: 767px) {
        .view-product .product-items .shopping-item {
            top: 66px;
        }
    }
    .view-product .product-items .shopping-item .shopping-list {
        height: 200px;
        overflow-y: scroll;
        padding-right: 10px;
    }
    .view-product .product-items .shopping-item .shopping-list li {
        overflow: hidden;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 15px;
        margin-bottom: 15px;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .view-product .product-items .shopping-item .shopping-list li .cart-img {
        border: 1px solid #ededed;
        overflow: hidden;
        height: 105px;
        width: 80px;
        border-radius: 4px;
        float: left;
        margin-right: 20px;
    }
    @media (max-width: 767px) {
        .view-product .product-items .shopping-item .shopping-list li .cart-img {
            height: 60px;
            width: 60px;
            margin-right: 10px;
        }
    }
    .view-product .product-items .shopping-item .bottom {
        text-align: center;
    }
    
    .view-product .product-items .shopping-item .bottom .total {
        overflow: hidden;
        display: block;
        padding-bottom: 4px;
    }
    .view-product .product-items .shopping-item .bottom .total span {
        text-transform: capitalize;
        color: #222;
        font-weight: 600;
        float: left;
    }
    .view-product .product-items .shopping-item .bottom .total .total-amount {
        float: right;
        font-size: 14px;
    }

    form {
        position: relative;
    }

    .paypal-btn {
        background-color: #004c93;
        width: 250px;
        border: none;
        border-radius: 5px;
        margin: 10px 0 0 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .paypal-btn i {
        font-size: 30px;
        color: #fff;
        margin-right: 6px;
    }

    .paypal-btn span {
        color: #fff;
        font-size: 16px;
    }

    .SingleShippingAddress_shipping-addresses_19Ila {
        display: none !important;
        background: #000 !important;
    }
</style>