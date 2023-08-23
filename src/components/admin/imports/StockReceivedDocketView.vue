<template>
    <div class="modal d-block" v-if="showModal">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold">Phân loại sản phẩm</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="box box-info">
                        <div class="box-body">
                            <div class="">
                                <div class="form-group">
                                    <table class="example1 table table-bordered dataTable">
                                        <thead>
                                            <tr role="row">
                                                <th width="6%">#</th>
                                                <th width="36%">Màu sắc</th>
                                                <th width="29%">Kích cỡ</th>
                                                <th width="29%">Số lượng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(inventory, index) in filteredInventories" :key="inventory">
                                                <td>{{ index+1 }}</td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <span
                                                            class="filters-panel-group-item__item-box circle mb-0" 
                                                            :style="`background-color: ${inventory.color}`"
                                                        >
                                                        </span>
                                                        <span>{{ inventory.color_name }}</span>
                                                    </div>
                                                </td>
                                                <td>{{ inventory.size_name }}</td>
                                                <td>
                                                    <input type="text" 
                                                        :value="formattedPrice(inventory.quantity)" 
                                                        @input="updateQuantity(index, $event)"
                                                        @keypress="validateKeyPress"/>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colspan="3" class="text-center text-bold">Tổng số lượng</th>
                                                <th class="px-4">{{ calculatedTotalQuantity.toLocaleString() }}</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>        

    <section class="content">
        <div class="box-body" v-if="stockReceivedDocketLocal">
            <div class="import-view">
                <div class="import-view__container">
                    <div class="import-view__item">
                        <label for="date">Số phiếu nhập:</label>
                        <span>{{ stockReceivedDocketLocal.id }}</span>
                    </div>
                    <div class="import-view__item">
                        <label for="date">Ngày nhập:</label>
                        <span>{{ stockReceivedDocketLocal.date }}</span>
                    </div>
                </div>
                <div class="import-view__container">
                    <div class="import-view__item">
                        <label for="date">Nhà cung cấp:</label>
                        <span>{{ stockReceivedDocketLocal.supplier.name }}</span>
                    </div>
                    <div class="import-view__item">
                        <label for="date">Mã nhà cung cấp:</label>
                        <span>{{ stockReceivedDocketLocal.supplier.id }}</span>
                    </div>
                    <div class="import-view__item">
                        <label for="date">Mã số thuế:</label>
                        <span>{{ stockReceivedDocketLocal.supplier.tax_code }}</span>
                    </div>
                </div>
                <div class="import-view__container">
                    <label for="date">Địa chỉ:</label>
                    <span>{{ stockReceivedDocketLocal.supplier.address }}</span>
                </div>
                <div class="import-view__container">
                    <div class="import-view__item">
                        <label for="date">Số điện thoại:</label>
                        <span>{{ stockReceivedDocketLocal.supplier.phone }}</span>
                    </div>
                    <div class="import-view__item">
                        <label for="date">Email:</label>
                        <span>{{ stockReceivedDocketLocal.supplier.email }}</span>
                    </div>
                    <div class="import-view__item">
                        <label for="date">Số tài khoản:</label>
                        <span>{{ stockReceivedDocketLocal.supplier.bank_account }}</span>
                    </div>
                </div>
                <div class="import-view__container">
                    <table class="example1 table table-bordered dataTable">
                        <thead>
                            <tr role="row">
                                <th width="4%">#</th>
                                <th width="10%">ID</th>
                                <th width="25%">Tên sản phẩm</th>
                                <th width="12%">Giá bán</th>
                                <th width="12%">Giá nhập</th>
                                <th width="10%">Số lượng</th>
                                <th width="17%">Thành tiền</th>
                                <th width="10%">Phân loại</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in stockReceivedDocketLocal.items" :key="product">
                                <td>{{ index + 1 }}</td>
                                <td>{{ product.product_id }}</td>
                                <td>{{ product.product_name }}</td>
                                <td>
                                    <input type="text" :value="formattedPrice(product.price)"
                                        @input="updatePrice(index, $event)" @keypress="validateKeyPress">
                                </td>
                                <td>
                                    <input type="text" :value="formattedPrice(product.price_purchase)"
                                        @input="updatePricePurchase(index, $event)" @keypress="validateKeyPress">
                                </td>
                                <td>
                                    <input type="text" :value="formattedPrice(product.quantity)"
                                        @input="updateQuantity(index, $event)" @keypress="validateKeyPress">
                                </td>
                                <td>
                                    <input type="text" :value=computedTotalItem(index) @keypress="validateKeyPress" />
                                </td>
                                <td>
                                    <button type="button" class="btn border-0" @click="showModalClassify(product)">
                                        <img src="/images/icon/icondetail.png" alt="">
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr v-if="stockReceivedDocketLocal.items.length == 0">
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
                    <span>{{ stockReceivedDocketLocal.description }}</span>
                </div>
                <div class="import-view__container">
                    <label for="date">Tổng tiền nhập hàng:</label>
                    <span>{{ formatPrice(stockReceivedDocketLocal.total_price) }}</span>
                </div>
                <div class="import-view__container">
                    <label for="date">Thuế GTGT:</label>
                    <span>{{ formatPrice(stockReceivedDocketLocal.value_added) }}</span>
                </div>
                <div class="import-view__container">
                    <label for="date">Tổng giá trị phiếu nhập:</label>
                    <span>{{ formatPrice(stockReceivedDocketLocal.total_value) }}</span>
                </div>
                <div class="import-view__container">
                    <label for="date">Người lập phiếu:</label>
                    <span>{{ stockReceivedDocketLocal.staff.name }}</span>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import StockReceivedDocketService from "@/services/admin/stock-received-docket.service";
import ClassifyModal from "@/components/admin/imports/ClassifyModal.vue";
import { formatPrice } from "../../../utils";

export default {
    components: {
        ClassifyModal
    },
    props: {
        id: { type: Number, required: true },
    },
    data() {
        return {
            stockReceivedDocketLocal: "",
            datePart: null,
            currentProduct: null,
            showModal: false,
        };
    },
    computed: {
        filteredInventories() {
            return this.stockReceivedDocketLocal.inventories.filter(
                inventory => inventory.product_id === this.currentProduct.product_id
            );
        },
        computedTotalItem() {
            return index => {
                const item = this.stockReceivedDocketLocal.items[index];
                return ((item.price_purchase * item.quantity) || 0).toLocaleString();
            };
        },
        calculatedTotalQuantity() {
            let total = 0;
            for (const item of this.stockReceivedDocketLocal.items) {
                total += item.quantity;
            }
            return total.toLocaleString();
        },
        calculatedIntoMoney() {
            let total = 0;
            for (const item of this.stockReceivedDocketLocal.items) {
                total += item.quantity * item.price_purchase;
            }
            return total.toLocaleString();
        },
    },
    methods: {
        formatPrice,
        formattedPrice(value) {
            return value.toLocaleString();
        },
        async getStockReceivedDocket(id) {
            try {
                this.stockReceivedDocketLocal = await StockReceivedDocketService.get(id);
                const dateObject = new Date(this.stockReceivedDocketLocal.date);

                const year = dateObject.getFullYear();
                const month = dateObject.getMonth() + 1; // Lưu ý: Tháng trong JavaScript bắt đầu từ 0
                const day = dateObject.getDate();

                this.datePart = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                this.stockReceivedDocketLocal.date = this.datePart;

            } catch (error) {
                console.log(error);
            }
        },
        showModalClassify(product) {
            console.log(product)
            this.showModal = true;
            this.currentProduct = product;
        },
        async closeModal() {
            this.showModal = false;
            this.currentProduct = null;
        },
    },
    async mounted() {
        this.getStockReceivedDocket(this.id);
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