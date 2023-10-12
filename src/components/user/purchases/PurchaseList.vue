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
                                    <p>Phân loại: {{ product.color }}, {{ product.size }}</p>
                                    <p>
                                        <span class="me-1">{{ product.quantity }} x </span>
                                        <span class="me-3 text-danger "
                                            v-if="product.price_discount > 0">
                                            {{ formatPrice(product.price-product.price_discount) }}
                                        </span>
                                        <span :class="{ 'text-decoration-line-through ': product.price_discount > 0 }">
                                            {{ formatPrice(product.price) }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="purchase-price">
                            <p v-if="product.price_discount > 0">{{ formatPrice((product.price-product.price_discount)*product.quantity) }}</p>
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
                        @click="cancelOrder(purchase)"
                    >
                        Hủy đơn
                    </button>
                    <button
                        v-if="purchase.status.id == 9 && isCurrentDateLessThanReceiptDate(purchase.receipted_at)"
                        type="button"
                        class="btn btn-warning me-3"
                        @click="openModal(purchase.items)"
                    >
                        Đánh giá
                    </button>  
                    <button
                        v-if="purchase.status.id == 9 && isCurrentDateLessThanReturnDate(purchase.receipted_at)"
                        type="button"
                        class="btn btn-light me-3"
                        @click="openModalReturn(purchase)"
                    >
                        Hoàn trả
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
        </div>
    </div>

    <ReturnModal v-if="showModalReturn" :showModalReturn="showModalReturn" 
        @closeModal="closeModal" :selectedPurchase="selectedPurchase"/>

    <ReviewModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :selectedPurchase="selectedPurchase"/>
</template>

<script>
    import OrderService from "@/services/user/order.service";
    import ReviewForm from "@/components/user/reviews/ReviewForm.vue";
    import ReviewModal from "@/components/user/reviews/ReviewModal.vue";
    import ReturnModal from "@/components/user/returns/ReturnModal.vue";
    import {mapGetters} from 'vuex';
    import { formatPrice } from '@/utils';

    export default {
        name: 'PurchaseList',
        components: {
            ReviewForm,
            ReviewModal,
            ReturnModal
        },
        props: {
            purchases: { type: Array, default: [] },
        },
        data() {
            return {
                purchasesList: this.purchases,
                isClicked: false,
                showModal: false,
                showModalReturn: false,
                selectedPurchase: [],
            };
        },
        watch: {
            purchases(newPurchases) {
                this.purchasesList = newPurchases.slice();
            },
        },
        methods: {
            formatPrice,
            cancelOrder(order) {
                try {
                    OrderService.cancelOrder(order.id)
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
            openModal(purchase) {
                this.selectedPurchase = purchase;
                this.showModal = true;
            },
            openModalReturn(purchase) {
                this.selectedPurchase = purchase;
                this.showModalReturn = true;
            },
            closeModal() {
                this.showModal = false;
                this.selectedPurchase = [];
                this.showModalReturn = false;
            },
            isCurrentDateLessThanReceiptDate(date) {
                const currentDate = new Date();
                const newDate = new Date(date);
                newDate.setDate(newDate.getDate() + 30);
                const receiptDte = new Date(newDate.toISOString().slice(0, 19).replace('T', ' '));
                return currentDate < receiptDte;
            },
            isCurrentDateLessThanReturnDate(date) {
                const currentDate = new Date();
                const newDate = new Date(date);
                newDate.setDate(newDate.getDate() + 7);
                const receiptDte = new Date(newDate.toISOString().slice(0, 19).replace('T', ' '));
                return currentDate < receiptDte;
            },
        },
        computed: {
            ...mapGetters(['getUser']),
        }
        
    };
</script>

<style scoped>
.review .modal-dialog-scrollable .modal-body {
    max-height: 500px;
    overflow: hidden;
    overflow-y: scroll;
}
</style>