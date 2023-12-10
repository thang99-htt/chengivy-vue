<template>
     <section class="content">
        <div class="row center-block">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-body">
                        <div class="group-btn">
                            <div class="d-flex align-items-center justify-content-end mb-4">
                                <div>
                                    <button type="button" class="btnBack" @click="refreshList()">
                                        <i class="fa fa-refresh"></i>Làm mới
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table class="example1 table dataTable">
                            <thead>
                                <tr role="row">
                                    <th width="6%" data-orderable="false">ID</th>
                                    <td width="20%"></td>
                                    <th width="35%">Sản phẩm</th>
                                    <th width="14%">Tổng nhập</th>
                                    <th width="14%">Tổng xuất</th>
                                    <th width="14%">Có sẵn</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in filteredCombinedData" 
                                    :key="product.id || index" :data-key="product.id || index"
                                >
                                    <td>{{ product.id }}</td>
                                    <td class="text-center">
                                        <span v-if="!product.month_year" class="product-view_plus" @click="toggleAdditionalRow(product)">
                                            <i class="bi bi-chevron-right" :class="{ expanded: product.visible }"></i>
                                        </span> 
                                        <span v-if="!product.month_year">({{ product.filtered_inventories.length }})</span>
                                    </td>
                                    <td>
                                        <img v-if="product.image" :src="product.image" alt="" width="50" height="50">
                                        <span v-if="!product.color" class="ms-3">{{ product.name }}</span>
                                        <span class="d-flex align-items-end" v-if="product.color">
                                            <span
                                                class="filters-panel-group-item__item-box circle" 
                                                :style="`background-color: ${product.color.color}`"
                                            ></span> -
                                            <span class="ms-2">{{ product.size.name }}</span>
                                        </span>
                                    </td>
                                    <td>{{ (product.total_import).toLocaleString() }}</td>
                                    <td>{{ (product.total_export).toLocaleString() }}</td>
                                    <td>
                                        <span v-if="product.total_final==0" class="text-danger">Hết hàng</span>
                                        <span v-else class="text-green">{{ (product.total_final).toLocaleString() }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import $ from 'jquery'
import { initializeDataTable } from '../../../utils';
import ProductService from "@/services/admin/product.service";
import { formatPrice } from '@/utils';

export default {
    name: 'inventory',
    data() {
        return {
            inventories: [],
            selectedProductIndex: [],
            combinedData: [],
        };
    },
    computed: {
        filteredCombinedData() {
            if(this.combinedData) {
                return this.combinedData.filter(product => {
                    // Keep products with month_year or visible set to true
                    return !product.month_year || product.visible;
                });
            }
        }
    },
    methods: {
        formatPrice,
        async retrieveInventories() {
            try {
                const rawInventories = await ProductService.getInventories();
                this.inventories = rawInventories.map(product => product);
                this.selectedProductIndex = this.inventories.map(index => index.filtered_inventories);

                this.combinedData = [];
                for (let i = 0; i < this.inventories.length; i++) {
                    const inventory = { ...this.inventories[i], visible: false }; // Thay đổi visible thành false cho mỗi item của inventories
                    this.combinedData.push(inventory);
                    
                    if (this.selectedProductIndex[i]) {
                        const selectedProducts = this.selectedProductIndex[i].map(product => ({ ...product, visible: false })); // Thay đổi visible thành true cho mỗi item của selectedProductIndex
                        this.combinedData.push(...selectedProducts);
                    }   
                }
                if ($.fn.DataTable.isDataTable('.example1')) {
                    $('.example1').DataTable().destroy();
                }
                this.$nextTick(() => {
                    initializeDataTable();
                });
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveInventories();
        },
        toggleAdditionalRow(product) {
            product.visible = !product.visible;
            const productId = product.id; // Assuming `id` is the product ID
            for (const data of this.combinedData) {
                if (data.product_id === productId) { // Assuming `product_id` is the ID in combinedData
                    data.visible = !data.visible;
                }
            }
        },
    },
    mounted() {
        this.retrieveInventories();
        this.inventories.sort((a, b) => a.id - b.id);
    },
};
</script>

<style scoped>
.text-green {
    color: #0cab0c !important;
    font-weight: 600;
}
</style>