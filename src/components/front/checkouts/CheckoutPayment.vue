<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <div class="dash_blog">
                    <div class="dash_blog_inner">
                        <div class="dash_head">
                            <h3>KIỂM TRA VÀ THANH TOÁN</h3>
                        </div>
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
                                    <Field name="payment" type="radio" :value="payment.id" v-model="payment_checked.payment_id"/>
                                        <label class="form-check-label ms-2" for="exampleRadios1">
                                            <img :src="getImagePayment(payment.image)" width="25" alt="">
                                            {{ payment.name }}
                                        </label>
                                    </div>
                                </div>
                                <div class="list_cont">
                                    <p>Gửi đến</p>
                                </div>
                                <div
                                    v-if="address_order == null"
                                    class="dash_main ps-4"
                                >
                                    <p>Địa chỉ chưa được chọn.</p>
                                </div>
                                <div
                                    v-else
                                    class="dash_main ps-4"
                                >
                                    <p>{{ address_order.user.name }} </p>
                                    <p>Điện thoại: {{ address_order.phone }} </p>
                                    <p>Địa chỉ:
                                        {{ address_order.address }}, {{  address_order.ward.name }}, 
                                        {{  address_order.ward.district.name }}, {{  address_order.ward.district.city.name }}
                                    </p>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="view-product">
                                    <div class="product-items">                                
                                        <div class="shopping-item">
                                            <div class="text-dark text-bold">
                                                <span>{{ carts.count_item }} sản phẩm</span>
                                            </div>
                                            <hr>
                                            <ul class="shopping-list">
                                                <li 
                                                    v-for="(cart, index) in carts.getCartItems"
                                                    :key="cart"
                                                >  
                                                    <div class="product-img-head">
                                                        <a class="cart-img" href="product-details.html">
                                                            <img v-if="cart.product.image" :src="getImage(cart.product.image)" alt="#" />
                                                        </a>
                                                    </div>
                                                    <div class="">
                                                        <h6><a href="product-details.html">{{ cart.product.name }}</a></h6>
                                                        <p>Size: {{ cart.size }}</p>
                                                        <p class="quantity">
                                                            {{ cart.quantity }} x - {{ formatPrice(cart.final_price) }}
                                                        </p>
                                                    </div>
                                                </li>
                                            </ul>
                                            <hr>
                                            <div class="bottom mt-4">
                                                <div class="total">
                                                    <span>Tổng tiền</span>
                                                    <span class="total-amount">{{ formatPrice(carts.into_money) }} VĐN</span>
                                                </div>
                                                <div class="total">
                                                    <span>Phí vận chuyển</span>
                                                    <span class="total-amount">25.000 VĐN</span>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="bottom mt-4">
                                                <div class="total">
                                                    <span>Tổng đơn đặt hàng</span>
                                                    <span class="total-amount">{{ formatPrice(carts.into_money + 25000) }} VĐN</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CartService from "@/services/front/cart.service";
    import AddressService from "@/services/front/address.service";
    import PaymentMethodService from "@/services/back/payment.service";
    import axios from 'axios';
    import {mapGetters} from 'vuex';
    import { Form, Field, ErrorMessage } from "vee-validate";

    export default {
        name: 'Header',
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        props: {
            addess_check: { type: Object, required: true },
            payment_check: { type: Object, required: true },
        },
        data() {
            return {
                carts: [],
                token: localStorage.getItem('token'),
                address_order: null,
                payments: [],
                payment_checked: this.payment_check,
            };
        },
        async mounted() {
            this.refreshList();
        },
        methods: {
            async retrieveCarts() {
                try {
                    await axios.get(`/api/user`, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }).then(async (response) => {
                        this.carts = await CartService.getCart(response.data.id);
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            async retrieveAddressOrder(addess_check) {
                try {
                    this.address_order = await AddressService.getAddressOrder(addess_check.contact_id);
                } catch (error) {
                    console.log(error);
                }
            },
            async retrievePaymentMethod() {
                try {
                    this.payments = await PaymentMethodService.getAll();
                    console.log(this.payments);
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveCarts();
                this.retrieveAddressOrder(this.addess_check);
                this.retrievePaymentMethod();
            },
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            getImagePayment(image){
                return 'http://127.0.0.1:8000/storage/uploads/checkout/'+image;
            },
            formatPrice(value) {
                let val = (value/1).toFixed(2)
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        },
        computed: {
            ...mapGetters(['user'])
        }
         
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
        height: 80px;
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
</style>