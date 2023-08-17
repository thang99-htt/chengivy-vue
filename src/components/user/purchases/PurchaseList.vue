<template>
    <div class="purchase">
        <div
            class="purchase-container"
            v-for="(purchase, index) in purchasesList"
            :key="purchase.id"
        >
            <div class="purchase-head">
                <div class="purchase-id">
                    Đơn hàng #{{ purchase.id }}
                </div>
                <div class="purchase-status">
                    <span>{{ purchase.status.description }}</span>
                    <span> {{ purchase.status.name }}</span>
                </div>
            </div>
            <hr>
            <router-link
                    class="d-block"
                    :to="{
                        name: 'purchase.detail',
                        params: { id: purchase.id },
                    }" 
            >
                <div class="purchase-content">
                    <div 
                        class="purchase-item"
                        v-for="(product, index) in purchase.items"
                        :key="product.id"
                    >
                        <div class="purchase-info">
                            <div class="d-flex">
                                <img class="d-block me-3" width="100" :src="product.image" alt="">
                                <div>
                                    <router-link 
                                        :to="{
                                            name: 'product.detail',
                                            params: { id: product.id },
                                        }" 
                                        class="text-dark"
                                    >
                                        {{ product.name }}
                                    </router-link>
                                    <p>Size: {{ product.size }}</p>
                                    <p>
                                        <span class="me-1">{{ product.quantity }} x </span>
                                        <span class="me-3 text-danger "
                                            v-if="product.price_discount > 0">
                                            {{ formatPrice(product.price_discount) }}
                                        </span>
                                        <span :class="{ 'text-decoration-line-through ': product.price_discount > 0 }">
                                            {{ formatPrice(product.price) }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="purchase-price">
                            <p v-if="product.price_discount > 0">{{ formatPrice(product.price_discount*product.quantity) }}</p>
                            <p v-else>{{ formatPrice(product.price*product.quantity) }}</p>
                        </div>
                    </div>
                </div>
            </router-link>
            <hr>
            <div class="purchase-btn">
                <div class="purchase-price__item">
                    <p class="fw-bold">Thành tiền: </p>
                    <p class="total-price">{{ formatPrice(purchase.total_value) }}</p>
                </div>
                <div class="purchase-btn__item">
                    <button
                        v-if="purchase.status.id == 1"
                        type="button"
                        class="btn btn-danger"
                        @click="cancleOrder(purchase)"
                    >
                        Hủy đơn
                    </button>
                    <button
                        v-if="purchase.status.id == 9"
                        type="button"
                        class="btn btn-warning me-3"
                        @click="openModel(purchase.order_details)"
                    >
                        Đánh giá
                    </button>  
                    <button
                        v-if="purchase.status.id == 9"
                        type="button"
                        class="btn btn-light"
                    >
                        Mua lại
                    </button> 
                    <button
                        v-else-if="purchase.status.id == 10"
                        type="button"
                        class="btn btn-secondary"
                    >
                        Đã hủy
                    </button>              
                    <button
                        v-else-if="purchase.status.id == 7"
                        type="button"
                        class="btn btn-success"
                        v-if="!isClicked"
                        @click="receiptOrder(purchase)"
                    >
                        Đã nhận hàng
                    </button>  
                </div>
            </div>
            <div v-if="myModel">
                <div class="modal d-block">
                    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="updateAddressModalLabel">Đánh Giá Sản Phẩm</h5>
                                <button type="button" class="btn-close"  @click="closeModel"></button>
                            </div>
                            <div class="modal-body">
                                <ReviewForm 
                                    :reviews="reviews"
                                    :selectedPurchase="selectedPurchase"
                                    @submit:reviews="addToReview"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import OrderService from "@/services/user/order.service";
    import ReviewService from "@/services/user/review.service";
    import ReviewForm from "@/components/user/products/ReviewForm.vue";
    import {mapGetters} from 'vuex';
    import { formatPrice } from '@/utils';

    export default {
        name: 'PurchaseList',
        components: {
            ReviewForm
        },
        props: {
            purchases: { type: Array, default: [] },
        },
        data() {
            return {
                purchasesList: this.purchases,
                isClicked: false,
                myModel: false,
                selectedPurchase: null,
                // review: {
                //     'id': this.id,
                //     'user_id': "",
                //     'content': "",
                //     'rate': 0,
                //     'images': []
                // },
                reviews: {
                    review: []
                }
            };
        },
        watch: {
            purchases(newPurchases) {
                this.purchasesList = newPurchases.slice();
            },
        },
        methods: {
            formatPrice,
            cancleOrder(order) {
                try {
                    OrderService.cancleOrder(order.id)
                    .then(async (response) => {
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
                            this.purchasesList = await OrderService.getAllPurchase(this.getUser.id);
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
                    .then(async (response) => {
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
                            this.purchasesList = await OrderService.getAllPurchase(this.getUser.id);
                            this.isClicked = true;
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
            openModel(purchase) {
                this.selectedPurchase = purchase;
                this.myModel = true;
            },
            closeModel() {
                this.myModel = false;
                this.selectedPurchase = null;
            },
            async addToReview(data) {
                // console.log(data)
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
                try {
                    await ReviewService.create(data).then(async (response) => {
                        console.log(response);
                        Toast.fire({
                            icon: 'success',
                            title: 'Đánh giá đã được thêm thành công.'
                        });
                        this.myModel = false;
                    });
                } catch (error) {
                    console.log(error.response);
                }
            },
        },
        computed: {
            ...mapGetters(['getUser']),
        }
        
    };
</script>