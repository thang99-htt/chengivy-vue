<template>
    <PaymentVoucherModal v-if="modalPayment" :showModal="showModal" @closeModal="closeModal" />
    <SupplierModal v-if="modalSupplier" :showModal="showModal" @closeModal="closeModal" />
    <ClassifyModal v-if="modalClassify" :stockReceivedDocketLocal="stockReceivedDocketLocal"
        :currentProduct="currentProduct" :showModal="showModal" @closeModal="closeModal" />
    <ProductModal v-if="modalProduct" :showModal="showModal" @closeModal="closeModal" />

    <Form @submit="submitStockReceivedDocket">
        <div class="row import">
            <div class="col-8">
                <div class="form-group">
                    <div class="import-product">
                        <div class="import-product__search">
                            <div class="search-input" @click="viewSearch">
                                <a class="search-btn"><i class="bi bi-search"></i></a>
                                <input type="text" v-model="keyword" placeholder="Tìm kiếm sản phẩm"/>
                                <a class="search-btn"><i class="bi bi-plus" @click="openModalProduct"></i></a>
                            </div>
                            <div class="sub-menu-search">
                                <ul id="nav" class="navbar-nav ms-aut">
                                    <li class="nav-item" v-for="product in filteredProducts" :key="product"
                                        @click="chooseProduct(product)">
                                        <div class="d-flex">
                                            <img :src="product.image" width="60" height="60">
                                            <div class="ms-3 d-flex flex-column">
                                                <span>{{ product.name }}</span>
                                                <span>Giá bán:
                                                    <span :class="{ 'text-danger': product.discount_percent > 0 }">
                                                        {{ formatPrice(product.price_final) }}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <table class="example1 table table-bordered dataTable">
                            <thead>
                                <tr role="row">
                                    <th width="4%">#</th>
                                    <th width="10%">ID</th>
                                    <th width="25%">Tên sản phẩm</th>
                                    <th width="10%">Giá bán</th>
                                    <th width="10%">Giá nhập</th>
                                    <th width="10%">Số lượng</th>
                                    <th width="15%">Thành tiền</th>
                                    <th width="10%">Phân loại</th>
                                    <th width="6%"></th>
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
                                    <td>
                                        <a class="remove-option" @click="removeProduct(product)">Xóa</a>
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
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="form-group">
                    <div class="form-group__container">
                        <div class="form-group__label">
                            <label for="date">Ngày nhập
                                <span class="error-feedback">*</span>
                            </label>
                        </div>
                        <div class="form-group__input">
                            <input name="date" type="date" class="datepicker d-block"
                                v-model="stockReceivedDocketLocal.date">
                            <ErrorMessage name="date" class="error-feedback" />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-group__container">
                        <div class="form-group__label">
                            <label for="form">Hình thức
                                <span class="error-feedback">*</span>
                            </label>
                        </div>
                        <div class="form-group__input">
                            <div class="d-flex align-items-center">
                                <input v-model="stockReceivedDocketLocal.form" name="form" type="radio"
                                    value="Nhập hàng mới" class="m-2 ms-0" />
                                <label for="form" class="product-form">Nhập hàng mới</label>
                                <input v-model="stockReceivedDocketLocal.form" name="form" type="radio"
                                    value="Nhập lại vào kho" class="m-2" />
                                <label for="form" class="product-form">Nhập lại vào kho</label>
                            </div>
                            <ErrorMessage name="form" class="error-feedback" />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-group__container">
                        <div class="form-group__label">
                            <label for="supplier_id">Nhà cung cấp
                                <span class="error-feedback">*</span>
                            </label>
                        </div>
                        <div class="form-group__input">
                            <div class="aselect" :data-value="value" :data-list="suppliers">
                                <div class="plus" @click="openModalSupplier">
                                    <i class="fa fa-plus" data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Thêm danh mục"></i>
                                </div>
                                <div class="selector" @click="visible1 = !visible1">
                                    <div class="label">
                                        <span>{{ selectedSupplier }}</span>
                                    </div>
                                    <div class="arrow1" :class="{ expanded: visible1 }"></div>
                                    <div :class="{ hidden: !visible1, visible1 }">
                                        <div class="selector-container">
                                            <ul>
                                                <li :class="{ current: supplier.name === selectedSupplier }"
                                                    v-for="(supplier, index) in suppliers" :key="supplier.id"
                                                    :value="supplier.id" @click.stop="selectOptionSupplier(supplier)">
                                                    {{ supplier.name }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-group__container">
                        <div class="form-group__label">
                            <label for="form">Phiếu chi
                                <span class="error-feedback">*</span>
                            </label>
                        </div>
                        <div class="form-group__input">
                            <div class="aselect" :data-value="value" :data-list="payments">
                                <div class="plus" @click="openModalPayment">
                                    <i class="fa fa-plus" data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Thêm thương hiệu"></i>
                                </div>
                                <div class="selector" @click="visible = !visible">
                                    <div class="label">
                                        <span>{{ selectedPayment }}</span>
                                    </div>
                                    <div class="arrow1" :class="{ expanded: visible }"></div>
                                    <div :class="{ hidden: !visible, visible }">
                                        <div class="selector-container">
                                            <ul>
                                                <li :class="{ current: payment.name === selectedPayment }"
                                                    v-for="(payment, index) in payments" :key="payment.id"
                                                    :value="payment.id" @click.stop="selectOptionPayment(payment)">
                                                    {{ payment.id }}, {{ payment.date }}, {{
                                                        formatPrice(payment.total_price) }}, {{ payment.supplier.name }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-group__container">
                        <div class="form-group__label">
                            <label for="form">Diễn giải
                                <span class="error-feedback">*</span>
                            </label>
                        </div>
                        <div class="form-group__input">
                            <Field name="description" type="text" class="form-control"
                                v-model="stockReceivedDocketLocal.description" />
                            <ErrorMessage name="description" class="error-feedback" />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-group__container">
                        <div class="form-group__label">
                            <label for="form">Chứng từ gốc
                                <span class="error-feedback">*</span>
                            </label>
                        </div>
                        <div class="form-group__input">
                            <Field name="image" type="file" class="form-control frm-file" accept="image/*"
                                @change="onFileChange" v-model="stockReceivedDocketLocal.image" />
                            <img v-if="stockReceivedDocketLocal.image" :src="stockReceivedDocketLocal.image" 
                                alt="Image" width="50" height="50">
                            <ErrorMessage name="image" class="error-feedback" />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-group__container">
                        <div class="form-group__label">
                            <label for="form">Tổng tiền
                                <span class="error-feedback">*</span>
                            </label>
                        </div>
                        <div class="form-group__input">
                            <input type="text" class="form-control" v-model="formattedTotalPrice"
                                @keypress="validateKeyPress" />
                            <ErrorMessage name="total_price" class="error-feedback" />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-group__container">
                        <div class="form-group__label">
                            <label for="form">Thuế GTGT
                                <span class="error-feedback">*</span>
                            </label>
                        </div>
                        <div class="form-group__input">
                            <input type="text" class="form-control" v-model="formattedValueAdded"
                                @keypress="validateKeyPress" />
                            <ErrorMessage name="value_added" class="error-feedback" />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-group__container">
                        <div class="form-group__label">
                            <label for="form">Tổng giá trị
                                <span class="error-feedback">*</span>
                            </label>
                        </div>
                        <div class="form-group__input">
                            <input type="text" class="form-control" v-model="formattedTotalValue"
                                @keypress="validateKeyPress" />
                            <ErrorMessage name="total_value" class="error-feedback" />
                        </div>
                    </div>
                </div>
                <div class="form-group float-end pe-3">
                    <input type="submit" name="btnSave" value="Thực hiện">
                    <input type="button" name="btnDelete" value="Xóa" v-if="stockReceivedDocketLocal.id">
                    <input type="button" name="btnBack" value="Hủy" v-else @click="reset">
                </div>
            </div>
        </div>

    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import SupplierService from "@/services/admin/supplier.service";
import PaymentVoucherService from "@/services/admin/payment.service";
import ProductService from "@/services/admin/product.service";
import PaymentVoucherModal from "@/components/admin/payments/PaymentVoucherModal.vue";
import SupplierModal from "@/components/admin/suppliers/SupplierModal.vue";
import ClassifyModal from "@/components/admin/imports/ClassifyModal.vue";
import ProductModal from "@/components/admin/products/ProductModal.vue";
import { formatPrice } from '../../../utils';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        PaymentVoucherModal,
        SupplierModal,
        ClassifyModal,
        ProductModal
    },
    emits: ["submit:stockReceivedDocket", "delete:stockReceivedDocket"],
    props: {
        stockReceivedDocket: { type: Object, required: true }
    },
    watch: {
            'product'(newValue) {
                this.productLocal = newValue;
            },
        },
    data() {
        return {
            stockReceivedDocketLocal: this.stockReceivedDocket,
            suppliers: [],
            payments: [],
            visible: false,
            visible1: false,
            visible2: false,
            selectedSupplier: "---Chọn nhà cung cấp---",
            selectedPayment: "---Chọn phiếu chi---",
            showModal: false,
            modalPayment: false,
            modalSupplier: false,
            modalClassify: false,
            modalProduct: false,
            products: [],
            keyword: "",
            currentProduct: null,
            value: 0, // 
        };
    },
    computed: {
        filteredProducts() {
            if (!this.keyword) return this.products;
            return this.products.filter(item =>
                item.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
                item.id.toString().toLowerCase().includes(this.keyword.toLowerCase())
            );
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
        computedTotalItem() {
            return index => {
                const item = this.stockReceivedDocketLocal.items[index];
                return ((item.price_purchase * item.quantity) || 0).toLocaleString();
            };
        },
        formattedTotalPrice: {
            get() {
                // Format the number using commas as thousands separators
                return this.stockReceivedDocketLocal.total_price.toLocaleString();
            },
            set(newValue) {
                // Remove commas from the input and update the raw numeric value
                this.stockReceivedDocketLocal.total_price = parseFloat(newValue.replace(/,/g, ""));
            },
        },
        formattedValueAdded: {
            get() {
                // Format the number using commas as thousands separators
                return this.stockReceivedDocketLocal.value_added.toLocaleString();
            },
            set(newValue) {
                // Remove commas from the input and update the raw numeric value
                this.stockReceivedDocketLocal.value_added = parseFloat(newValue.replace(/,/g, ""));
            },
        },
        formattedTotalValue: {
            get() {
                // Format the number using commas as thousands separators
                return this.stockReceivedDocketLocal.total_value.toLocaleString();
            },
            set(newValue) {
                // Remove commas from the input and update the raw numeric value
                this.stockReceivedDocketLocal.total_value = parseFloat(newValue.replace(/,/g, ""));
            },
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
                total += item.quantity*item.price_purchase;
            }
            return total.toLocaleString();
        },
    },
    methods: {
        validateKeyPress(event) {
            // Allow only numeric characters and backspace
            const charCode = (event.which) ? event.which : event.keyCode;
            if (charCode !== 8 && charCode !== 0 && (charCode < 48 || charCode > 57)) {
                event.preventDefault();
            }
        },
        updatePrice(index, event) {
            const newValue = event.target.value.replace(/,/g, "");
            this.stockReceivedDocketLocal.items[index].price = parseFloat(newValue);
        },
        updatePricePurchase(index, event) {
            const newValue = event.target.value.replace(/,/g, "");
            this.stockReceivedDocketLocal.items[index].price_purchase = parseFloat(newValue);
            this.updateIntoMoney();
        },
        updateQuantity(index, event) {
            const newValue = event.target.value.replace(/,/g, "");
            this.stockReceivedDocketLocal.items[index].quantity = parseFloat(newValue);
            this.updateIntoMoney();
        },
        updateIntoMoney() {
            let total = 0;
            for (const item of this.stockReceivedDocketLocal.items) {
                total += (item.price_purchase * item.quantity) || 0;
            }
            this.stockReceivedDocketLocal.total_price = total;
        },
        formattedPrice(value) {
            return value.toLocaleString();
        },
        formatPrice,
        submitStockReceivedDocket() {
            this.$emit("submit:stockReceivedDocket", this.stockReceivedDocketLocal);
            // this.selectedSupplier = "---Chọn nhà cung cấp---";
            // this.selectedPayment = "---Chọn phiếu chi---";
        },
        deleteStockReceivedDocket() {
            this.$emit("delete:stockReceivedDocket", this.stockReceivedDocketLocal.id);
        },
        onFileChange(event) {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = (file) => {
                this.stockReceivedDocketLocal.image = reader.result;
            }
            reader.readAsDataURL(file);
        },
        async retrieveSuppliers() {
            try {
                this.suppliers = await SupplierService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async retrievePaymentVouchers() {
            try {
                this.payments = await PaymentVoucherService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        openModalSupplier() {
            this.showModal = true;
            this.modalSupplier = true;
        },
        selectOptionSupplier(supplier) {
            this.selectedSupplier = supplier.name;
            this.stockReceivedDocketLocal.supplier_id = supplier.id;

        },
        selectOptionPayment(payment) {
            this.selectedPayment = payment.id + ", " + payment.date + ", " + this.formatPrice(payment.total_price);
            this.stockReceivedDocketLocal.payment_voucher_id = payment.id;

        },
        async closeModal() {
            this.showModal = false;
            this.modalSupplier = false;
            this.modalPayment = false;
            this.modalClassify = false;
            this.modalProduct = false;
            this.suppliers = await SupplierService.getAll();
            this.payments = await PaymentVoucherService.getAll();
            this.products = await ProductService.getAll();
        },
        openModalPayment() {
            this.showModal = true;
            this.modalPayment = true;
        },
        openModalProduct() {
            this.showModal = true;
            this.modalProduct = true;
        },
        showModalClassify(product) {
            this.showModal = true;
            this.modalClassify = true;
            this.currentProduct = product;
        },
        viewSearch() {
            const navbarToggler = document.querySelector(".sub-menu-search");
            navbarToggler.classList.toggle("d-block");
        },
        async getProductAll() {
            try {
                this.products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        chooseProduct(product) {
            const index = this.stockReceivedDocketLocal.items.findIndex(
                item => item.product_id === product.id);
            if (index === -1) {
                this.stockReceivedDocketLocal.items.push({
                    product_id: product.id,
                    product_name: product.name,
                    product_image: product.image,
                    price: product.price,
                    price_purchase: 0,
                    quantity: 0,
                });

            }
        },
        removeProduct(product) {
            let inventoriesToDelete = []; // Lưu trữ các sản phẩm cần xóa

            this.stockReceivedDocketLocal.inventories.forEach((inventory, index) => {
                if (inventory.product_id === product.product_id) {
                    inventoriesToDelete.push(index); // Lưu index của các mục cần xóa
                }
            });

            // Xóa các mục theo danh sách index đã thu thập
            inventoriesToDelete.reverse().forEach(index => {
                this.stockReceivedDocketLocal.inventories.splice(index, 1);
            });
            
            const index = this.stockReceivedDocketLocal.items.findIndex(
                item => item.product_id === product.product_id);
            if (index !== -1) {
                this.stockReceivedDocketLocal.items.splice(index, 1);
            }
           
        }
    },
    mounted() {
        this.retrieveSuppliers();
        this.retrievePaymentVouchers();
        this.getProductAll();

        if(this.stockReceivedDocket.supplier && this.stockReceivedDocket.payment_voucher) {
            this.selectedSupplier = this.stockReceivedDocket.supplier.name;
            this.selectedPayment = this.stockReceivedDocket.payment_voucher.id + ", " +
            this.stockReceivedDocket.payment_voucher.date + ", " + this.stockReceivedDocket.payment_voucher.total_price
            + ", " + this.stockReceivedDocket.supplier.name;
        }
    },
};
</script>
<style scoped>
.box-body .dataTable thead {
    background-color: #dae9f3;
    color: #000;
}

.product-form {
    font-weight: normal;
    font-size: 13px;
    margin-bottom: 0;
}

.import .aselect .selector .label {
    overflow: hidden;
    width: 170px;
}

.import .form-group {
    margin-bottom: 8px;
}

.import {
    height: 480px;
    overflow: hidden;
}
.import .import-product {
    overflow-y: scroll;
    height: 480px;
    scrollbar-width: none; 
}
.import .import-product::-webkit-scrollbar {
    width: 0;
}
</style>
