<template>
    <div class="ms-3">
        <div class="box-header with-border p-0 mb-4">
            <h3 class="box-title">Đơn hàng gần đây</h3>
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
    import PurchaseList from "@/components/front/purchases/PurchaseList.vue";
    import OrderService from "@/services/front/order.service";
    import axios from 'axios';

    export default {
        components: {
            PurchaseList,
        },
        name: 'purchase',
        data() {
            return {
                purchases: [],
                token: localStorage.getItem('token'),
            };
        },
        computed: {
            filteredPurchases() {
                return this.purchases;
            },
            filteredPurchasesCount() {
                return this.filteredPurchases.length;
            },
        },
        methods: {
            async retrievePurchases() {
                try {
                    await axios.get(`/api/user`, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }).then(async (response) => {
                        this.purchases = await OrderService.getAllPurchase(response.data.id);
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrievePurchases();
            },
        },
        mounted() {
            this.refreshList();
        },
    };

</script>
    