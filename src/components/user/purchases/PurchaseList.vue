<template>
    <div class="accordion mt-3">
        <div
            class="accordion-item"
            v-for="(purchase, index) in purchasesList"
            :key="purchase.id"
        >
            <router-link
                class="d-block"
                :to="{
                    name: 'purchase.detail',
                    params: { id: purchase.id },
                }" 
            >
                <div class="accordion-status">
                    <span>{{ purchase.status.description }}</span>
                    <span> {{ purchase.status.name }}</span>
                </div>
                <hr>
                <div class="accordion-content">
                    <div 
                        class="row"
                        v-for="(product, index) in purchase.order_details"
                        :key="product.id"
                    >
                        <div class="col-8">
                            <div class="d-flex">
                                <img class="d-block me-3" width="100" :src="getImage(product.product_image)" alt="">
                                <div>
                                    <router-link 
                                        :to="{
                                            name: 'product.detail',
                                            params: { id: product.product_id },
                                        }" 
                                        class="text-dark"
                                    >
                                        {{ product.product_name }}
                                    </router-link>
                                    <p>Size: {{ product.product_size }}</p>
                                    <p>x{{ product.product_quantity }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 accordion-price">
                            <p class="fs-6">{{ formatPrice(product.product_price) }}</p>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="accordion-btn">
                    <div>
                        <span>Thành tiền: </span><span class="fs-4 ms-3">{{ formatPrice(purchase.total_price) }} VNĐ</span>
                    </div>
                    <button
                        v-if="purchase.status.id == 1"
                        type="button"
                        class="btn btn-danger"
                        @click="cancleOrder(purchase)"
                    >
                        Hủy đơn
                    </button>
                    <button
                        v-else-if="purchase.status.id == 9"
                        type="button"
                        class="btn btn-warning"
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
                        v-else
                        type="button"
                        class="btn btn-success"
                        v-if="!isClicked"
                        @click="receiptOrder(purchase)"
                    >
                        Đã nhận hàng
                    </button>  
                    <button v-else class="btn btn-success" disabled>
                        Đã nhận hàng
                    </button>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import OrderService from "@/services/user/order.service";
    import {mapGetters} from 'vuex';

    export default {
        name: 'PurchaseList',
        props: {
            purchases: { type: Array, default: [] },
        },
        data() {
            return {
                purchasesList: this.purchases,
                isClicked: false,
            };
        },
        methods: {
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            cancleOrder(order) {
                try {
                    OrderService.cancleOrder(order.id)
                    .then(async (response) => {
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
        },

        computed: {
            ...mapGetters(['getUser']),
        }
        
    };
</script>

<style>
    .accordion-item {
        background-color: #fffdfd;
        box-shadow: 0 0 10px #00000012;
        padding: 20px;
        margin-bottom: 20px;
    }

    .accordion-item img {
        border-radius: 4px;
    }

    .accordion-item hr {
        height: 1px;
        color: #aeaeaeee;
    }

    .accordion-status {
        display: flex;
        justify-content: end;
    }
    
    .accordion-status span {
        padding: 0 10px ;
    }
    
    .accordion-status span:nth-child(1) {
        border-right: 1px solid #ccc;
        color: #26aa99;
    }

    .accordion-status span:nth-child(2) {
        color: orangered;
        text-transform: uppercase;
    }

    .accordion-price {
        display: flex;
        align-items: center;
        justify-content: end;
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
</style>