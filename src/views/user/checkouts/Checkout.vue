<template>
    <div class="mt-4 mb-5">
        <div class='container'>
            <div class="checkout-progress" :class="(stepCheck === 0 || stepCheck === 1) || stepCheck === 2 ? 'step-1' : 'step-2'">
                <div v-if="stepCheck == 1" class="step-1 checkout-progress-fill-1"></div>
                <div v-if="stepCheck == 2" class="step-1 checkout-progress-fill-2"></div>
                <div class="progress-bar">
                    <div v-if="stepCheck === 1" @click="stepCheck = 0" class="step step-1 active cursor" :class="{'step-fill-1': stepCheck === 1 || stepCheck === 2}">
                        <span>1</span>
                        <div class="fa fa-check" :class="{'check-1': stepCheck === 1 || stepCheck === 2}"></div>
                        <div class="step-label">Vận chuyển</div>
                    </div>
                    <div v-else class="step step-1 active" :class="{'step-fill-1': stepCheck === 1 || stepCheck === 2}">
                        <span>1</span>
                        <div class="fa fa-check" :class="{'check-1': stepCheck === 1 || stepCheck === 2}"></div>
                        <div class="step-label">Vận chuyển</div>
                    </div>
                    <div class="step step-2" :class="{'active step-fill-2': stepCheck === 2}">
                        <span>2</span>
                        <div class="fa fa-check" :class="{'check-2': stepCheck === 2}"></div>
                        <div class="step-label">Kiểm tra & Thanh toán</div>
                    </div>
                    <div class="step step-3">
                        <span>3</span>
                        <div class="fa fa-check"></div>
                        <div class="step-label">Thành công</div>
                    </div>
                </div>
            </div>
            <div class="dash_blog">
                <div class="liveAlert"></div>
                <CheckoutShipping 
                    v-if="stepCheck == 0"
                    :order="order"
                />
                <CheckoutPayment 
                    v-if="stepCheck == 1"
                    :addressOrder="addressOrder"
                    :carts="carts"
                    :order="order"
                />
                <CheckoutComplete v-if="stepCheck == 2"/>
                <div class="button-container">
                    <div v-if="stepCheck == 0" class="btn btn-next" @click="payment">Tiếp tục</div>
                    <div v-if="stepCheck == 1 && order.payment_id != 3" class="btn btn-next" @click="createOrder(order)">Hoàn tất thanh toán</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CheckoutShipping from "@/components/user/checkouts/CheckoutShipping.vue";
    import CheckoutPayment from "@/components/user/checkouts/CheckoutPayment.vue";
    import CheckoutComplete from "@/components/user/checkouts/CheckoutComplete.vue";
    import OrderService from "@/services/user/order.service";
    import CartService from "@/services/user/cart.service";
    import {mapGetters} from 'vuex';

    export default {
        components: {
            CheckoutShipping,
            CheckoutPayment,
            CheckoutComplete,
        },
        data() {
            return {
                stepCheck: 0,  
                order: {
                    'delivery_address': "",
                    'payment_method_id': 1,
                    'voucher_id': 0,
                    'note': "",
                    'paid': 0,
                    'total_price': 0,
                    'total_discount': 0,
                    'total_value': 0
                },
                addressOrder: null
            }
        },
        methods: {
            payment() {
                this.stepCheck = 1;
            },
            complete() {
                this.stepCheck = 2;
            },
            shipping() {
                this.stepCheck = 0;
            },
            async createOrder(data) {
                if(this.productBuyNow) {
                    try {
                        await OrderService.addBuyNow(this.getUser.id, Object.assign({}, data, this.productBuyNow));
                        this.$store.dispatch('removeProductBuyNow');
                        this.stepCheck = 2;
                        this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
                    } catch (error) {
                        console.log(error.response);
                    }
                } else {
                    try {
                        await OrderService.create(this.getUser.id, data);
                        this.$store.commit('addToCart', await CartService.getCart(this.getUser.id));
                        this.stepCheck = 2;
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        computed: {
            ...mapGetters(['getUser', 'carts', 'productBuyNow']),
        },
    }
</script>
    
<style>
    .checkout-progress {
        width: 50%;
        margin: 30px auto 0;
        font-size: 25px;
        font-weight: 900;
        position: relative;
    }
    .checkout-progress.step-2:after {
        -webkit-transform: scaleX(0.333) translateY(-50%) perspective(1000px);
        transform: scaleX(0.333) translateY(-50%) perspective(1000px);
    }
    .checkout-progress.step-3:after {
        -webkit-transform: scaleX(0.666) translateY(-50%) perspective(1000px);
        transform: scaleX(0.666) translateY(-50%) perspective(1000px);
    }
    .checkout-progress.step-4:after {
        -webkit-transform: scaleX(1) translateY(-50%) perspective(1000px);
        transform: scaleX(1) translateY(-50%) perspective(1000px);
    }
    .checkout-progress.step-5:after {
        -webkit-transform: scaleX(1) translateY(-50%) perspective(1000px);
        transform: scaleX(1) translateY(-50%) perspective(1000px);
    }
    .checkout-progress.step-6:after {
        -webkit-transform: scaleX(1) translateY(-50%) perspective(1000px);
        transform: scaleX(1) translateY(-50%) perspective(1000px);
    }
    .checkout-progress .progress-bar {
        width: 100%;
        display: flex;
        height: 10px;
        justify-content: space-between;
        align-items: center;
        flex-direction: unset;
        overflow: unset;
        background-color: #ccc;
        position: relative;
        box-shadow: none;
    }
    .checkout-progress .progress-bar .step {
        z-index: 2;
        position: relative;
    }
    .checkout-progress .progress-bar .step .step-label {
        position: absolute;
        top: calc(100% + 15px);
        left: 50%;
        -webkit-transform: translateX(-50%) perspective(1000px);
        transform: translateX(-50%) perspective(1000px);
        white-space: nowrap;
        font-size: 15px;
        font-weight: 500;
        color: #2d2d2d;
        transition: 0.3s ease;
    }
    .checkout-progress .progress-bar .step span {
        color: #868686;
        transition: 0.3s ease;
        display: block;
        -webkit-transform: translate3d(0, 0, 0) scale(1) perspective(1000px);
        transform: translate3d(0, 0, 0) scale(1) perspective(1000px);
    }
    .checkout-progress .progress-bar .step .fa-check {
        color: transparent;
        position: absolute;
        left: -4px;
        top: 5px;
    }
    .checkout-progress .progress-bar .step.active span, .checkout-progress .progress-bar .step.active .step-label {
        font-weight: 600;
    }
    
    .step.active span {
        color: #2C3E50 !important;        
    }
    
    .checkout-progress .progress-bar .step.valid span {
        color: #2C3E50;
        -webkit-transform: translate3d(0, 0, 0) scale(2) perspective(1000px);
        transform: translate3d(0, 0, 0) scale(2) perspective(1000px);
    }
    .checkout-progress .progress-bar .step.valid .step-label {
        color: #2C3E50 !important;
    }
    .checkout-progress .progress-bar .step:after {
        content: "";
        position: absolute;
        z-index: -1;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%) perspective(1000px);
        transform: translate(-50%, -50%) perspective(1000px);
        width: 45px;
        height: 45px;
        background-color: #fff;
        border-radius: 50%;
        border: 5px solid #ccc;
        transition: 0.3s ease;
    }
    .checkout-progress .progress-bar .step.active:after {
        border: 5px solid #2C3E50;
    }
    .checkout-progress .progress-bar .step.valid:after {
        background-color: #2C3E50;
        border: 5px solid #2C3E50;
    }
    .button-container {
        position: absolute;
        bottom: 20px;
        left: 0;
    }
    .button-container .btn {
        display: inline-block;
        background-color: #000;
        color: #fff;
        padding: 10px 20px;
        border-radius: 4px;
        text-transform: uppercase;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 2px;
        transition: 0.3s ease;
        cursor: pointer;
        text-align: center;
        width: 380px;
        margin-left: 25px;
    }
    .checkout-progress-fill-1:before {
        content: "";
        position: absolute;
        left: 0;
        top: 5px;
        height: 10px;
        width: 50%;
        background-color: #00b141;
        -webkit-transform: translateY(-50%) perspective(1000px);
        transform: translateY(-50%) perspective(1000px);
        z-index: 1;
    }

    .checkout-progress-fill-2:before {
        content: "";
        position: absolute;
        left: 0;
        top: 5px;
        height: 10px;
        width: 100%;
        background-color: #00b141;
        -webkit-transform: translateY(-50%) perspective(1000px);
        transform: translateY(-50%) perspective(1000px);
        z-index: 2;
    }

    .step-fill-1:after,
    .step-fill-2:after {
        background-color: #2C3E50 !important;
    }

    .check-1,
    .check-2 {
        color: #fff !important;
    }
    
    .dash_blog {
        min-height: 750px;
        background: #fafdff;
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        float: left;
        width: 100%;
        margin-top: 20px;
        position: relative;
    }
    .cursor {
        cursor: pointer;
    }
</style>