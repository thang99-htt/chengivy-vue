<template>
    <div v-if="order" class="profile-info">
        <div class="purchase-head detail">
            <div class="purchase-id">
                <a href="/customer/purchases"><i class="bi bi-chevron-left"></i></a>
                Đơn hàng #{{ order.id }}
            </div>
            <div class="purchase-status">
                <span>{{ order.status.description }}</span>
                <span> {{ order.status.name }}</span>
            </div>
        </div>        
        <div class="checkout-progress__purchase" v-if="!order.cancled_at">
            <div class="progress-bar">
                <div class="step active">
                    <span><i class="bi bi-receipt-cutoff"></i></span>
                    <div class="step-label">Đơn hàng đã đặt</div>
                    <div class="step-label-date">{{ order.ordered_at }}</div>
                </div>
                <div class="step" :class="{'active': order.status.id >= 2 }">
                    <span><i class="bi bi-cash-coin"></i></span>
                    <div class="step-label">Đã xác nhận</div>
                    <div class="step-label-date">{{ order.confirmed_at }}</div>
                </div>
                <div class="step" :class="{'active': order.status.id >= 4 }">
                    <span><i class="bi bi-truck"></i></span>
                    <div class="step-label" v-if="order.status.id >= 4 ">Đã giao cho ĐVVC</div>
                    <div class="step-label-date" v-if="order.status.id >= 4 ">{{ order.ordered_at }}</div>
                    <div class="step-label" v-else>Vận chuyển</div>
                </div>
                <div class="step" :class="{'active': order.status.id >= 4 }">
                    <span><i class="bi bi-journal-arrow-down"></i></span>
                    <div class="step-label" v-if="order.status.id >= 4 && order.status.id <= 7 ">Đang giao</div>
                    <div class="step-label" v-else>Đã nhận được hàng</div>
                    <div class="step-label-date" v-if="order.status.id >= 4 ">{{ order.receipted_at }}</div>
                </div>
                <div class="step" :class="{'active': order.status.id >= 8 }">
                    <span><i class="bi bi-star"></i></span>
                    <div class="step-label" v-if="order.status.id == 9">Đã hoàn thành</div>
                    <div class="step-label-date" v-if="order.status.id == 9">{{ order.receipted_at }}</div>
                    <div class="step-label" v-else>Đánh giá</div>
                </div>                     
            </div>
        </div> 
        <div class="purchase-store">
            <div class="purchase-store__rate" v-if="order.receipted_at && isCurrentDateLessThanReceiptDate ">
                <p>Đánh giá trước ngày {{ addDays(order.receipted_at, 30) }} để nhận 200 xu tại Chengivy!</p>
                <div class="purchase-btn">
                    <div class="purchase-btn__item">
                        <button
                            type="button"
                            class="btn btn-warning me-3"
                            @click="openModal(order.items)"
                        >
                            Đánh giá
                        </button>  
                    </div>
                </div>
            </div>
            <div class="purchase-store__thank" v-else>
                <div v-if="order.cancled_at">
                    <p class="order-cancel">Đơn hàng đã hủy</p>
                    <p>vào 
                        {{ new Date(order.cancled_at).toLocaleTimeString('en-US', { hour12: false }) }}
                        {{ new Date(order.cancled_at).toLocaleDateString('en-US').replace(/\//g, '-') }}
                    </p>
               </div>
                <p v-if="order.receipted_at">Cảm ơn bạn đã mua sắm tại Chengivy!</p>
                <div class="purchase-btn" v-if="order.receipted_at">
                    <div class="purchase-btn__item">
                        <button
                            type="button"
                            class="btn btn-light me-3"
                        >
                            Mua lại
                        </button>  
                    </div>
                </div>
                <p v-else>Ngày nhận hàng dự kiến {{ order.estimated_at.split(' ')[0] }}. Bạn có thể kiểm tra hàng sau khi thanh toán.</p>
            </div>
        </div>
        <div class="purchase-img"></div>
        <div class="purchase-list" v-if="!order.cancled_at">
            <div class="purchase-summary">
                <div class="purchase-content">
                    <div class="purchase-summary__info">
                        <h3>Địa chỉ nhận hàng</h3>
                        <div>
                            <span class="acc-name">{{ order.name_receiver }}</span>
                            <span>{{ order.phone_receiver }}</span>
                        </div>
                        <div>
                            {{ order.user_address_detail }}
                        </div>
                        <div>
                            {{ order.user_address }}
                        </div>
                        <h3>Phương thức thanh toán</h3>
                        <div>
                            <span>{{ order.payment_method }}</span>
                        </div>
                    </div>
                    <!-- <div class="purchase-summary__follow">
                        <div class="follow-content">
                            <div class="follow-item">
                                <div class="follow-item__icon">
                                    <i class="bi bi-receipt-cutoff"></i>
                                </div>
                                <div class="follow-item__tiem">
                                    <p>
                                        {{ new Date(order.ordered_at).toLocaleTimeString('en-US', { hour12: false }) }}
                                        {{ new Date(order.ordered_at).toLocaleDateString('en-US').replace(/\//g, '-') }}    
                                    </p>
                                </div>
                            </div>
                            <div class="follow-item">
                                <div class="follow-item__status">
                                    <p>{{ order.status.name }}</p>
                                    <p>{{ order.status.description }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="follow-content">
                            <div class="follow-item">
                                <div class="follow-item__icon">
                                    <i class="bi bi-receipt-cutoff"></i>
                                </div>
                                <div class="follow-item__tiem">
                                    <p>
                                        {{ new Date(order.ordered_at).toLocaleTimeString('en-US', { hour12: false }) }}
                                        {{ new Date(order.ordered_at).toLocaleDateString('en-US').replace(/\//g, '-') }}    
                                    </p>
                                </div>
                            </div>
                            <div class="follow-item" v-if="order.confirmed_at">
                                <div class="follow-item__status">
                                    <p>Đã được xử lý</p>
                                    <p>Đã xác nhận đơn hàng</p>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <PurchaseDetail
            :order="order"
        />          
    </div>
    <ReviewModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :selectedPurchase="selectedPurchase"/>
</template>
<script>
    import OrderService from "@/services/user/order.service";
    import PurchaseDetail from "@/components/user/purchases/PurchaseDetail.vue";
    import ReviewModal from "@/components/user/reviews/ReviewModal.vue";

    export default {
        components: {
            PurchaseDetail,
            ReviewModal
        },
        props: {
            id: { type: String, required: true },
            order: { type: Object, required: true },
        },
        data() {
            return {
                token: localStorage.getItem('token'),
                order: null,
                selectedPurchase: [],
                showModal: false
            };
        },
        computed: {
            isCurrentDateLessThanReceiptDate() {
                const currentDate = new Date();
                const receiptDte = new Date(this.addDays(this.order.receipted_at, 30));
                return currentDate < receiptDte;
            }
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
            },
            addDays(date, days) {
                const newDate = new Date(date);
                newDate.setDate(newDate.getDate() + days);
                return newDate.toISOString().slice(0, 19).replace('T', ' ');
            },
            openModal(purchase) {
                this.selectedPurchase = purchase;
                this.showModal = true;
            },
            closeModal() {
                this.showModal = false;
                this.selectedPurchase = [];
            },
        },
        created() {
            this.getPurchase(this.id);
        },
    };
</script>
<style scoped>
    .purchase-summary {
        background-color: #fffdfd;
        box-shadow: 0 0 10px #00000012;
        padding: 0 20px 20px;
        border: 1px solid #dee2e6;
    }
    .purchase-btn {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
    }
    
    .purchase-btn button {
        margin: 10px 0;
        padding: 8px 30px ;
    }
    .purchase-btn span:nth-child(2) {
        color: #0167f3;
    }
    .progress-bar {
        flex-direction: unset;
        overflow: unset;
        background-color: transparent !important;
        box-shadow: unset !important;
    }
    .checkout-progress__purchase {
        width: 100%;
        padding: 0 60px;
        height: 140px;
        font-size: 25px;
        position: relative;
        margin: 0 auto;
        background-color: #fffdfd;
        /* box-shadow: 0 0 10px #00000012; */
        border: 1px solid #dee2e6;
        border-top: 1px dotted #cacaca;
    }
    .checkout-progress__purchase:before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 32%;
        height: 10px;
        width: 80%;
        background-color: #ccc;
        margin-left: 80px;
    }
    
    .checkout-progress__purchase .progress-bar {
        margin-top: -20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .checkout-progress__purchase .progress-bar .step {
        z-index: 2;
        position: relative;
    }
    .checkout-progress__purchase .progress-bar .step .step-label {
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
    .checkout-progress__purchase .progress-bar .step .step-label-date {
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
        .checkout-progress__purchase .progress-bar .step .step-label {
            top: calc(100% + 15px);
        }
    }
    .checkout-progress__purchase .progress-bar .step span {
        font-size: 22px;
        color: #ccc;
        transition: 0.3s ease;
        display: block;
        -webkit-transform: translate3d(0, 0, 0) scale(1) perspective(1000px);
        transform: translate3d(0, 0, 0) scale(1) perspective(1000px);
    }
    .checkout-progress__purchase .progress-bar .step:after {
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
        border: 4px solid #ccc;
        transition: 0.3s ease;
    }

    .checkout-progress__purchase .progress-bar .step:not(:first-child).active::before {
        content: "";
        position: absolute;
        z-index: -1;
        right: 0;
        top: 50%;
        -webkit-transform: translate(0, -50%) perspective(1000px);
        transform: translate(0, -50%) perspective(1000px);
        width: 145px;
        height: 10px;
        background-color: #2dc258;
        border: 4px solid #2dc258;
        transition: 0.3s ease;
    }

    .checkout-progress__purchase .progress-bar .step.active:after {
        border: 4px solid #2dc258;
    }

    .checkout-progress__purchase .progress-bar .step span i::before {
        color: #ccc;
        font-weight: 700 !important;
    }

    .checkout-progress__purchase .progress-bar .step.active span i::before {
        color: #2dc258;
    }

    .purchase-head.detail {
        padding: 10px 20px;
        background-color: #ccc;
        margin-top: 20px;
        background-color: #fffdfd;
        box-shadow: 0 0 10px #00000012;
        border: 1px solid #dee2e6;
        border-bottom: none;
    }

    .order-cancel {
        color: #ce1800 !important;
        font-size: 22px;
        font-weight: 600;
    }

    .purchase-summary__follow {
        margin-left: 20px;
        padding: 10px 0 10px 20px;
        border-left: 1px solid #ccc ;
        display: flex;
        flex-direction: column-reverse;
    }

    /* .purchase-summary__info {
        width: 40%;
    } */

    .follow-content {
        display: flex;
        justify-content: start;
        align-items: start;
        margin-bottom: 6px;
        position: relative;
    }

    .follow-content:not(:first-child)::before {
        position: absolute;
        content: "";
        bottom: -9px;
        left: 12px;
        width: 3px;
        height: 28px;
        background-color: #ccc;
    }
    
    .purchase-summary__follow .follow-item {
        display: flex;
        align-items: center;
        margin-right: 15px;
    }

    .purchase-summary__follow .follow-item__icon {
        margin-right: 15px;
        border: 1px solid #ccc;
        padding: 2px 6px;
        border-radius: 50%;
    }

    .purchase-summary__follow .follow-item__icon i {
        color: #ccc;
    }

    .purchase-summary__follow .follow-item .follow-item__status p {
        margin: 0;
    }

    .purchase-summary__follow .follow-item .follow-item__status p:first-child {
        font-weight: 600;
    }
</style>