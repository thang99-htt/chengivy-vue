<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
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
                                            <Field name="payment" type="radio" :value="payment.id" v-model="orderLocal.payment_id"/>
                                            <label class="form-check-label ms-2" for="exampleRadios1">
                                                <img :src="getImagePayment(payment.image)" width="25" alt="">
                                                {{ payment.description }}
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
                                                    <span>{{ cartLocal.count_item }} sản phẩm</span>
                                                </div>
                                                <hr>
                                                <ul class="shopping-list">
                                                    <li 
                                                        v-for="(cart, index) in cartLocal.getCartItems"
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
                                                        <span class="total-amount">{{ formatPrice(cartLocal.into_money) }} VĐN</span>
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
                                                        <span class="total-amount">{{ formatPrice(cartLocal.into_money + 25000) }} VĐN</span>
                                                    </div>
                                                    <Field    
                                                        hidden
                                                        name="order_total_price" type="number"
                                                        class="form-control select" id="order_total_price"
                                                       :value="((cartLocal.into_money+25000)/23795).toFixed()"
                                                    />
                                                </div>
                                                <div v-show="orderLocal.payment_id == 3 && paymentStatus !== 'paid'" class="mt-4 text-center" id="paypal-button" @click="paypalCheckout()"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button-container btn-submit-order">
                                <button v-if="address_order != null && orderLocal.payment_id != 3 || paymentStatus === 'paid'" class="btn btn-next" @click="complete">Hoàn tất thanh toán</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AddressService from "@/services/front/address.service";
    import PaymentMethodService from "@/services/back/payment.service";
    import { Form, Field, ErrorMessage } from "vee-validate";

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
                token: localStorage.getItem('token'),
                address_order: null,
                payments: [],
                cartLocal: this.carts,
                orderLocal: this.order,
                myModel: false,
                paymentStatus: ''
            };
        },
        async mounted() {
            this.refreshList();
            this.paypalCheckout();
        },
        emits: ["submit:order"],
        methods: {
            async retrieveAddressOrder(order) {
                try {
                    this.address_order = await AddressService.getAddressOrder(order.contact_id);
                } catch (error) {
                    console.log(error);
                }
            },
            async retrievePaymentMethod() {
                try {
                    this.payments = await PaymentMethodService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveAddressOrder(this.order);
                this.retrievePaymentMethod();
            },
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            getImagePayment(image){
                return 'http://127.0.0.1:8000/storage/uploads/checkout/'+image;
            },
            formatPrice(value) {
                let val = (value/1)
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            submitOrder() {
                this.$emit("submit:order", this.orderLocal);
            },
            openModel() {
                this.myModel = true;
            },
            closeModel() {
                this.myModel = false;
            },
            async paypalCheckout() {
                var order_total_price = $("#order_total_price").val();
                await paypal.Button.render({
                    // Configure environment
                    env: 'sandbox',
                    client: {
                        sandbox: 'AT5pO4SLjEoDt65gg6gzPGMAp4Ml1XpOkoeWr7_G-qa3moiSJJFkdqDIBxh1ytFYbCLXHRoT1MsJSur1',
                        production: 'demo_production_client_id'
                    },
                    // Customize button (optional)
                    locale: 'en_US',
                    style: {
                        size: 'large',
                        color: 'gold',
                        shape: 'pill',
                        tagline : 'false',
                    },

                    // Enable Pay Now checkout flow (optional)
                    commit: true,

                    // Set up a payment
                    payment: function(data, actions) {
                        return actions.payment.create({
                            transactions: [{
                                amount: {
                                    // total: order_total_price,
                                    total: '0.01',
                                    currency: 'USD'
                                }
                            }]
                        });
                    },
                    // Execute the payment
                    onAuthorize: (data, actions) => {
                        return actions.payment.execute()
                            .then(() => {
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
                                });
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Thanh toán thành công. Hoàn tất đơn hàng ngay.'
                                })
                                this.paymentStatus = 'paid';
                            });
                    }
                        
                }, '#paypal-button');
                
            }
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

    .btn-submit-order {
        position: absolute;
        bottom: 0;
        right: 125px;
        justify-content: end !important;
        z-index: 10;
        width: 60% !important;
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