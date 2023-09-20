<template>
    <section class="content">
        <div class="box">
            <div class="box-body">
                <div class="statistical-report top">
                    <div class="report-item">
                        <h4>Sản phẩm chưa nhập kho</h4>
                        <div class="product-container">
                            <div class="product-item" v-for="item in inventories.missing_products" :key="item">
                                <img :src="item.image" alt="">
                                <p>{{ item.name.slice(0, 17) }}...</p>
                                <p>Giá <span>{{ formatPrice(item.price) }}</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="report-item">
                        <h4>Sản phẩm hết hàng</h4>
                        <div class="product-container">
                            <div class="product-item" v-for="item in inventories.out_of_stock_products" :key="item">
                                <img :src="item.image" alt="">
                                <p>{{ item.name.slice(0, 17) }}...</p>
                                <p>{{ item.color }} - {{ item.size }}</p>
                                <p>Đã bán <span>{{ (item.totalExport).toLocaleString() }}</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="report-item">
                        <h4>Sản phẩm chưa bán được</h4>
                        <div class="product-container">
                            <div class="product-item" v-for="item in inventories.unsold_products" :key="item">
                                <img :src="item.image" alt="">
                                <p>{{ item.name.slice(0, 17) }}...</p>
                                <p>Giá bán <span>{{ formatPrice(item.price) }}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import StatisticalService from "@/services/admin/statistical.service";
import { formatPrice } from "../../../utils";

    export default {
        components: {

        },
        data() {
            return {
                inventories: [],
            };
        },
        computed: {
            
        },
        methods: {
            formatPrice,
            async retrieveInventories() {
                try {
                    this.inventories = await StatisticalService.getInventories();
                } catch (error) {
                    console.log(error);
                }
            },
        },
        mounted() {
            this.retrieveInventories();
        },
    };
</script>

<style scoped>
.product-container {
    display: flex;
    flex-wrap: wrap;
}

.product-item {
    border-bottom: 1px solid #e5e5e5;
    flex: 0 0 calc(13% - 5px) ;
    margin: 5px;
    box-sizing: border-box;
    text-align: center;
}

.product-item img {
    width: 60px;
    height: 60px;
}

.product-item p {
    margin: 6px 0;
}

.product-item p:last-child span {
    font-weight: bold;
    color: #1f4173;
}
.product-item p:nth-child(2) {
    height: 20px;
}
</style>