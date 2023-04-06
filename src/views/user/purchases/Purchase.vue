<template>
    <div class="ms-3">
        <div class="box-header with-border p-0 mb-4">
            <h3>Đơn hàng gần đây</h3>
        </div>
        <PurchaseList 
            v-if="filteredPurchasesCount > 0"
            :purchases="filteredPurchases"
        />
        <div v-else>
            <img src="/images/cart/empty-cart.svg" class="d-block m-auto" alt="" />
            <h6 class="text-center mt-4">Chưa có đơn hàng nào.</h6>
            <div class="d-flex justify-content-center">
                <router-link 
                    :to="{name: 'home'}" 
                >
                    <button class="btn btn-dark mt-4">
                        TIẾP TỤC MUA SẮM
                    </button>
                </router-link>
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
                return this.purchases;
            },
            filteredPurchasesCount() {
                return this.filteredPurchases.length;
            },
            ...mapGetters(['getUser']),
        }
    };

</script>
    