<template>
    <section class="content">
        <div class="box-body" v-if="stockReceivedDocket">
            <div class="import-view">
                <div class="import-view__container">
                    <div class="import-view__item">
                        <label for="date">Số phiếu nhập:</label>
                        <span>{{ stockReceivedDocket.id }}</span>
                    </div>
                    <div class="import-view__item">
                        <label for="date">Ngày nhập:</label>
                        <span>{{ stockReceivedDocket.date }}</span>
                    </div>
                </div>
                <div class="import-view__container">
                    <div class="import-view__item">
                        <label for="date">Nhà cung cấp:</label>
                        <span>{{ stockReceivedDocket.supplier.name }}</span>
                    </div>
                    <div class="import-view__item">
                        <label for="date">Mã nhà cung cấp:</label>
                        <span>{{ stockReceivedDocket.supplier.id }}</span>
                    </div>
                    <div class="import-view__item">
                        <label for="date">Mã số thuế:</label>
                        <span>{{ stockReceivedDocket.supplier.tax_code }}</span>
                    </div>
                </div>
                <div class="import-view__container">
                    <label for="date">Địa chỉ:</label>
                    <span>{{ stockReceivedDocket.supplier.address }}</span>
                </div>
                <div class="import-view__container">
                    <div class="import-view__item">
                        <label for="date">Số điện thoại:</label>
                        <span>{{ stockReceivedDocket.supplier.phone }}</span>
                    </div>
                    <div class="import-view__item">
                        <label for="date">Email:</label>
                        <span>{{ stockReceivedDocket.supplier.email }}</span>
                    </div>
                    <div class="import-view__item">
                        <label for="date">Số tài khoản:</label>
                        <span>{{ stockReceivedDocket.supplier.bank_account }}</span>
                    </div>
                </div>
                <div class="import-view__container">
                    <table class="example1 table dataTable">
                        <thead>
                            <tr role="row">
                                <th width="8%">#</th>
                                <td width="8%"></td>
                                <th width="10%">ID sản phẩm</th>
                                <th width="21%">Tên sản phẩm</th>
                                <th width="12%">Giá bán</th>
                                <th width="12%">Giá nhập</th>
                                <th width="12%">Số lượng</th>
                                <th width="15%">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in filteredCombinedData" :key="product">
                                <td>{{ index + 1 }}</td>
                                <td class="text-center">
                                    <span v-if="!product.color" class="product-view_plus" @click="toggleAdditionalRow(product)">
                                        <i class="bi bi-chevron-right" :class="{ expanded: product.visible }"></i>
                                    </span> 
                                    <span v-if="!product.color">({{ product.inventoryCount }})</span>
                                </td>
                                <td>
                                    <span v-if="!product.color">{{ product.product_id }}</span>
                                </td>
                                <td>
                                    <span v-if="product.product_name">{{ product.product_name }}</span>
                                    <span class="d-flex align-items-end" v-else>
                                        <span
                                            class="filters-panel-group-item__item-box circle" 
                                            :style="`background-color: ${product.color}`"
                                        ></span> -
                                        <span class="ms-2">{{ product.size_name }}</span>
                                    </span>
                                </td>
                                <td>
                                    <span v-if="product.price">{{ formatPrice(product.price) }}</span>
                                </td>
                                <td>
                                    <span v-if="product.price">{{ formatPrice(product.price_purchase) }}</span>
                                </td>
                                <td>
                                    <span v-if="product.quantity">{{ (product.quantity).toLocaleString() }}</span>
                                </td>
                                <td>
                                    <span v-if="product.price_purchase">{{ formatPrice(product.quantity*product.price_purchase) }}</span>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr v-if="stockReceivedDocket.items.length == 0">
                                <th colspan="9" class="text-center text-bold">Chưa có sản phẩm nào</th>
                            </tr>
                            <tr v-else>
                                <th colspan="5" class="text-center text-bold">Tổng</th>
                                <th>{{ calculatedTotalQuantity }}</th>
                                <th>{{ calculatedIntoMoney }}</th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="import-view__container">
                    <label for="date">Diễn giải:</label>
                    <span>{{ stockReceivedDocket.description }}</span>
                </div>
                <div class="import-view__container">
                    <label for="date">Tổng tiền nhập hàng:</label>
                    <span>{{ formatPrice(stockReceivedDocket.total_price) }}</span>
                </div>
                <div class="import-view__container">
                    <label for="date">Thuế GTGT:</label>
                    <span>{{ formatPrice(stockReceivedDocket.value_added) }}</span>
                </div>
                <div class="import-view__container">
                    <label for="date">Tổng giá trị phiếu nhập:</label>
                    <span>{{ formatPrice(stockReceivedDocket.total_value) }}</span>
                </div>
                <div class="import-view__container">
                    <label for="date">Người lập phiếu:</label>
                    <span>{{ stockReceivedDocket.staff.name }}</span>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import StockReceivedDocketService from "@/services/admin/stock-received-docket.service";
import { formatPrice } from "../../../utils";

export default {
    props: {
        id: { type: Number, required: true },
    },
    data() {
        return {
            stockReceivedDocket: "",
            selectedProductIndex: [],
            combinedData: [],
            visible: false
        };
    },
    methods: {
        formatPrice,
        async getStockReceivedDocket(id) {
            try {
                this.stockReceivedDocket = await StockReceivedDocketService.get(id);

                const combinedArray = [];

                // Lặp qua từng item trong items
                this.stockReceivedDocket.items.forEach(item => {
                    // Thêm item vào mảng kết hợp
                    combinedArray.push(item);

                    // Tìm các inventories có product_id tương ứng và thêm vào mảng kết hợp
                    const inventoriesForItem = this.stockReceivedDocket.inventories.filter(inventory => inventory.product_id === item.product_id);

                    // Đếm số lượng inventories cho item này
                    const inventoryCount = inventoriesForItem.length;

                    // Thêm số lượng inventories vào item
                    item.inventoryCount = inventoryCount;

                    // Thêm các inventories vào mảng kết hợp
                    item.visible = false;

                    combinedArray.push(...inventoriesForItem);
                });

                // Gán mảng kết hợp vào displayArray để hiển thị
                this.combinedData = combinedArray;
                console.log(this.combinedData)

            } catch (error) {
                console.log(error);
            }
        },
        toggleAdditionalRow(product) {
            product.visible = !product.visible;
            const productId = product.product_id; // Assuming `id` is the product ID
            for (const data of this.combinedData) {
                if (data.product_id === productId) { // Assuming `product_id` is the ID in combinedData
                    data.visible = !data.visible;
                }
            }
        },
    },
    async mounted() {
        this.getStockReceivedDocket(this.id);
    },
    computed: {
        filteredCombinedData() {
            if(this.combinedData) {
                return this.combinedData.filter(product => {
                    // Keep products with month_year or visible set to true
                    return !product.color || product.visible;
                });
            }
        }
    },
};
</script>

<style scoped>
    .import-view__container {
        display: flex;
        margin-bottom: 10px;
    }
    .import-view__item {
        width: 33.333%;
    }

    .import-view__container label {
        margin-right: 6px;
    }

    .box-body .dataTable thead {
        background-color: #e6e6e6;
        color: #000;
    }

    .table-bordered>thead>tr>th {
        border: 1px solid #acacac !important;
    }
</style>