<template>
    <div class="section">
        <div class="cart-list list">
            <div class='container mt-30'>
                <div v-if="stepCheck == 0" class="checkout-progress step-1"  id="" data-current-step="1">
                    <div class="progress-bar">
                        <div class="step step-1 active">
                            <span>1</span>
                            <div class="fa fa-check"></div>
                            <div class="step-label">Vận chuyển</div>
                        </div>
                        <div class="step step-2">
                            <span>2</span>
                            <div class="fa fa-check"></div>
                            <div class="step-label">Thanh toán</div>
                        </div>
                        <div class="step step-3">
                            <span>3</span>
                            <div class="fa fa-check"></div>
                            <div class="step-label">Hoàn tất</div>
                        </div>
                    </div>
                </div>
                <div v-if="stepCheck == 1" class="checkout-progress step-1" id="" data-current-step="1">
                    <div class="step-1 checkout-progress-fill-1"></div>
                    <div class="progress-bar">
                        <div class="step step-1 active step-fill-1">
                            <span>1</span>
                            <div class="fa fa-check check-1"></div>
                            <div class="step-label">Vận chuyển</div>
                        </div>
                        <div class="step step-2">
                            <span>2</span>
                            <div class="fa fa-check"></div>
                            <div class="step-label">Thanh toán</div>
                        </div>
                        <div class="step step-3">
                            <span>3</span>
                            <div class="fa fa-check"></div>
                            <div class="step-label">Hoàn tất</div>
                        </div>
                    </div>
                </div>
                <div v-if="stepCheck == 2" class="checkout-progress step-2" id="" data-current-step="1">
                    <div class="step-1 checkout-progress-fill-2"></div>
                    <div class="progress-bar">
                        <div class="step step-1 active step-fill-1">
                            <span>1</span>
                            <div class="fa fa-check check-1"></div>
                            <div class="step-label">Vận chuyển</div>
                        </div>
                        <div class="step step-2 active step-fill-2">
                            <span>2</span>
                            <div class="fa fa-check check-2"></div>
                            <div class="step-label">Thanh toán</div>
                        </div>
                        <div class="step step-3">
                            <span>3</span>
                            <div class="fa fa-check"></div>
                            <div class="step-label">Hoàn tất</div>
                        </div>
                    </div>
                </div> 
                <div class="mt-5">
                    <p>UserID: {{ userId }} </p>
                    <p>ĐC: {{ addess_check }} </p>
                    <p>PTTT: {{ payment_check }}</p>
                </div>
                <CheckoutShipping 
                    v-if="stepCheck == 0"
                    :addess_check="addess_check"
                />
                <CheckoutPayment 
                    v-if="stepCheck == 1"
                    :addess_check="addess_check"
                    :payment_check="payment_check"
                />
                <CheckoutComplete v-if="stepCheck == 2"/>
                <div class="button-container">
                    <div v-if="stepCheck == 0" class="btn btn-prev disabled" @click="shipping">Trước đó</div>
                    <div v-if="stepCheck == 1" class="btn btn-prev" @click="shipping">Trước đó</div>
                    <div v-if="stepCheck == 0" class="btn btn-next" @click="payment">Tiếp tục</div>
                    <div v-if="stepCheck == 1" class="btn btn-next" @click="complete">Hoàn tất thanh toán</div>
                    <div v-if="stepCheck == 2" class="btn btn-next" @click="payment">Tiếp tục mua sắp</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CheckoutShipping from "@/components/front/checkouts/CheckoutShipping.vue";
    import CheckoutPayment from "@/components/front/checkouts/CheckoutPayment.vue";
    import CheckoutComplete from "@/components/front/checkouts/CheckoutComplete.vue";
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
                token: localStorage.getItem('token'),
                addess_check: {
                    'contact_id': 0,
                },
                payment_check: {
                    'payment_id': 1,
                },
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
        },
        computed: {
            ...mapGetters(['userId'])
        }
    }
</script>
    
<style>
    .progress-bar {
        flex-direction: unset;
        overflow: unset;
    }
    .checkout-progress {
        width: 50%;
        margin: 0px auto;
        font-size: 25px;
        font-weight: 900;
        position: relative;
    }
    .checkout-progress:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        height: 10px;
        width: 100%;
        background-color: #ccc;
        -webkit-transform: translateY(-50%) perspective(1000px);
        transform: translateY(-50%) perspective(1000px);
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
        height: 100px;
        justify-content: space-between;
        align-items: center;
    }
    .checkout-progress .progress-bar .step {
        z-index: 2;
        position: relative;
    }
    .checkout-progress .progress-bar .step .step-label {
        position: absolute;
        top: calc(100% + 25px);
        left: 50%;
        -webkit-transform: translateX(-50%) perspective(1000px);
        transform: translateX(-50%) perspective(1000px);
        white-space: nowrap;
        font-size: 15px;
        font-weight: 600;
        color: #ccc;
        transition: 0.3s ease;
    }
    @media (max-width: 767px) {
        .checkout-progress .progress-bar .step .step-label {
            top: calc(100% + 15px);
        }
    }
    .checkout-progress .progress-bar .step span {
        color: #ccc;
        transition: 0.3s ease;
        display: block;
        -webkit-transform: translate3d(0, 0, 0) scale(1) perspective(1000px);
        transform: translate3d(0, 0, 0) scale(1) perspective(1000px);
    }
    .checkout-progress .progress-bar .step .fa-check {
        color: transparent;
        position: absolute;
        left: -4px;
        top: 7px;
    }
    .checkout-progress .progress-bar .step.active span, .checkout-progress .progress-bar .step.active .step-label {
        color: #2C3E50;
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
    display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        margin: 20px auto 0px;
    }
    .button-container .btn {
        display: inline-block;
        background-color: #2C3E50;
        color: #fff;
        padding: 10px 20px;
        border-radius: 10px;
        text-transform: uppercase;
        font-size: 15px;
        font-weight: 500;
        border: 3px solid #2C3E50;
        transition: 0.3s ease;
        cursor: pointer;
        text-align: center;
    }
    @media (max-width: 767px) {
        .button-container .btn {
            width: 100%;
            margin-bottom: 15px;
        }
    }
    .button-container .btn:hover {
        background-color: transparent;
        color: #2C3E50;
        -webkit-transform: scale(1.02) perspective(1000px);
        transform: scale(1.02) perspective(1000px);
    }

    .checkout-progress-fill-1:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        height: 10px;
        width: 50%;
        background-color: #00b141;
        -webkit-transform: translateY(-50%) perspective(1000px);
        transform: translateY(-50%) perspective(1000px);
    }

    .checkout-progress-fill-2:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        height: 10px;
        width: 100%;
        background-color: #00b141;
        -webkit-transform: translateY(-50%) perspective(1000px);
        transform: translateY(-50%) perspective(1000px);
    }

    .step-fill-1:after,
    .step-fill-2:after {
        background-color: #2C3E50 !important;
    }

    .check-1,
    .check-2 {
        color: #fff !important;
    }
    
</style>