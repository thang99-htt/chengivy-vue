<template>    
    <div class="profile-info">
        <div class="liveAlert"></div>
        <div class="purchase-filter">
            <span :class="{'active': purchaseStatus == 0}" @click="purchaseStatus=0">Tất cả</span>
            <span :class="{'active': purchaseStatus == 1}" @click="purchaseStatus=1">Chờ xác nhận</span>
            <span :class="{'active': purchaseStatus == 5}" @click="purchaseStatus=5">Vận chuyển</span>
            <span :class="{'active': purchaseStatus == 6}" @click="purchaseStatus=6">Đang giao</span>
            <span :class="{'active': purchaseStatus == 9}" @click="purchaseStatus=9">Hoàn thành</span>
            <span :class="{'active': purchaseStatus == 10}" @click="purchaseStatus=10">Đã hủy</span>
        </div>
        <div class="profile-item">
            <PurchaseList 
                v-if="filteredPurchasesCount > 0"
                :purchases="filteredPurchases"
            />
            <div v-else class="m-auto">
                <img src="/images/cart/empty-cart.svg" class="d-block m-auto" alt="" />
                <h6 class="text-center mt-4">Chưa có đơn hàng nào.</h6>
                <div class="d-flex justify-content-center">
                    <a href="/products/all" class="button">
                        <button class="btn">
                            TIẾP TỤC MUA SẮM
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import PurchaseList from "@/components/user/purchases/PurchaseList.vue";
    import OrderService from "@/services/user/order.service";
    import {mapGetters} from 'vuex';

    export default {
        components: {
            PurchaseList,
        },
        name: 'purchase',
        data() {
            return {
                purchases: [],
                purchaseStatus: 0
            };
        },
        methods: {
            async retrievePurchases() {
                try {
                    this.purchases = await OrderService.getAllPurchase(this.getUser.id);
                } catch (error) {
                    console.log(error);
                }
            },
        },
        mounted() {
            this.retrievePurchases();
        },
        computed: {
            filteredPurchases() {
                let filtered = [...this.purchases];
                if (this.purchaseStatus === 0) {
                    return [...this.purchases];
                } else {
                    return filtered = filtered.filter(item => {
                        return item.status.id === this.purchaseStatus;
                    });
                }
            },
            filteredPurchasesCount() {
                return this.filteredPurchases.length;
            },
            ...mapGetters(['getUser']),
        }
    };

</script>
    