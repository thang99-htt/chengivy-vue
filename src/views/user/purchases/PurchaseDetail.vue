<template>
    <div class="row">
        <div class="col-md-12">
            <div v-if="order">
                <div class="mb-5">
                    <div class="checkout-progress"  id="" data-current-step="1">
                    <div v-if="!order.receipt_date && !order.cancle_date" class="checkout-progress-fill-1"></div>
                        <div class="progress-bar">
                            <div class="step">
                                <span><i class="bi bi-receipt-cutoff"></i></span>
                                <div class="step-label">Đơn hàng đã đặt</div>
                                <div class="step-label-date">{{ order.order_date }}</div>
                            </div>
                            <div class="step" v-if="order.cancle_date">
                                <span><i class="bi bi-x-square-fill"></i></span>
                                <div class="step-label">Đơn hàng đã hủy</div>
                                <div class="step-label-date">{{ order.cancle_date }}</div>
                            </div>
                            <div class="step" v-if="!order.cancle_date">
                                <span><i class="bi bi-truck"></i></span>
                                <div class="step-label">Ngày dự kiến giao hàng</div>
                                <div class="step-label-date">{{ order.estimate_date }}</div>
                            </div>
                            <!-- <div class="step">
                                <span><i class="bi bi-cash-coin"></i></span>
                                <div class="step-label">Đã xác nhận đơn hàng</div>
                                <div class="step-label-date">{{ order.order_date }}</div>
                            </div>
                            <div class="step">
                                <span><i class="bi bi-truck"></i></span>
                                <div class="step-label">Đã giao cho ĐVVC</div>
                                <div class="step-label-date">{{ order.order_date }}</div>
                            </div> -->
                            <div class="step" v-if="!order.cancle_date">
                                <span><i class="bi bi-journal-arrow-down"></i></span>
                                <div class="step-label">Đã nhận được hàng</div>
                                <div class="step-label-date">{{ order.receipt_date }}</div>
                            </div>
                            <!-- <div class="step">
                                <span><i class="bi bi-star"></i></span>
                                <div class="step-label">Đơn hàng đã hoàn thành</div>
                                <div class="step-label-date">{{ order.receipt_date }}</div>
                            </div> -->                            
                        </div>
                    </div>
                </div>
                <div class="py-3"></div>
                <div class="row">
                    <div class="accordion-item">
                        <div class="accordion-content">
                            <div>
                                <p class="fs-3 text-dark mb-3">Địa chỉ nhận hàng</p>
                                <p class="my-2">{{ order.user_name }}</p>
                                <p>{{ order.user_phone }}</p>
                                <p>{{ order.user_address }}, {{ order.ward }}, {{ order.district }}, {{ order.city }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <PurchaseDetail
                        :order="order"
                    />                    
                    <div class="accordion-btn">
                        <div>
                            <span>Tổng đơn đặt hàng: </span><span class="fs-4 ms-3">{{ formatPrice(order.total_price) }} VNĐ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import OrderService from "@/services/user/order.service";
    import PurchaseDetail from "@/components/user/purchases/PurchaseDetail.vue";

    export default {
        components: {
            PurchaseDetail,
        },
        props: {
            id: { type: String, required: true },
            order: { type: Object, required: true },
        },
        data() {
            return {
                token: localStorage.getItem('token'),
                order: null,
            };
        },
        methods: {
            async getPurchase(id) {
                try {
                    this.order = await OrderService.getPurchase(id);
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
            cancleOrder(order) {
                try {
                    OrderService.cancleOrder(order.id)
                    .then( (response) => {
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

                        if(response.success) {
                            this.refreshList();
                        }

                        Toast.fire({
                            icon: 'success',
                            title: 'Đơn hàng đã được hủy.'
                        })
                    })                  

                } catch (error) {
                    console.log(error);
                }   
            },
            receiptOrder(order) {
                try {
                    OrderService.receiptOrder(order.id)
                    .then( (response) => {
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

                        if(response.success) {
                            this.refreshList();
                        }

                        Toast.fire({
                            icon: 'success',
                            title: 'Cảm ơn bạn đã mua hàng.'
                        })
                    })                  

                } catch (error) {
                    console.log(error);
                }   
            },
            refreshList() {
                this.getPurchase(this.id);
            },
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        },
        created() {
            this.getPurchase(this.id);
        },
    };
</script>
<style>
    .accordion-item {
        background-color: #fffdfd;
        box-shadow: 0 0 10px #00000012;
        padding: 20px;
        margin-bottom: 20px;
        border: 1px solid #dee2e6;
    }
    .accordion-btn {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
    }
    
    .accordion-btn button {
        margin: 10px 0;
        padding: 8px 30px ;
    }
    .accordion-btn span:nth-child(2) {
        color: #0167f3;
    }
    .box-body {
        padding: 30px;
    }
    .social_cont {
        height: 230px;
    }
    .social_cont p {
        text-align: left;
        padding-left: 10px;
    }
    .head-product {
        font-size: 25px;
        font-weight: 500;
        padding: 12px;
        color: #fff;
        background-color: #ff9800 ;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .progress-bar {
        flex-direction: unset;
        overflow: unset;
        background-color: transparent !important;
        box-shadow: unset !important;
    }
    .checkout-progress {
        width: 90%;
        margin: 0 50px;
        font-size: 25px;
        position: relative;
    }
    .checkout-progress:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        height: 10px;
        width: 100%;
        background-color: #2dc258;
        -webkit-transform: translateY(-50%) perspective(1000px);
        transform: translateY(-50%) perspective(1000px);
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
        color: #000;
        transition: 0.3s ease;
    }
    .checkout-progress .progress-bar .step .step-label-date {
        position: absolute;
        top: calc(100% + 45px);
        left: 50%;
        -webkit-transform: translateX(-50%) perspective(1000px);
        transform: translateX(-50%) perspective(1000px);
        white-space: nowrap;
        font-size: 15px;
        color: #868686;
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
    .checkout-progress .progress-bar .step:after {
        content: "";
        position: absolute;
        z-index: -1;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%) perspective(1000px);
        transform: translate(-50%, -50%) perspective(1000px);
        width: 65px;
        height: 65px;
        background-color: #fff;
        border-radius: 50%;
        border: 4px solid #2dc258;
        transition: 0.3s ease;
    }
    .checkout-progress .progress-bar .step span i::before {
        color: #2dc258;
        font-weight: 700 !important;
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
        left: 50%;
        top: 50%;
        height: 10px;
        width: 50%;
        background-color: #ccc;
        -webkit-transform: translateY(-50%) perspective(1000px);
        transform: translateY(-50%) perspective(1000px);
    }
</style>