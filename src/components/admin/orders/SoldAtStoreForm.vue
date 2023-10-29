<template>
    <ProductModal v-if="modalProduct" :showModal="showModal" @closeModal="closeModal" />
    <CustomerModal v-if="modalCustomer" :showModal="showModal" @closeModal="closeModal" />

    <Form id="contentHtml">
        <div class="row import">
            <div class="col-8">
                <div class="form-group">
                    <div class="import-product">
                        <div class="import-product__search">
                            <div class="search-input" @click="viewSearch">
                                <a class="search-btn"><i class="bi bi-search"></i></a>
                                <input type="text" v-model="keyword" placeholder="Tìm kiếm sản phẩm theo tên hoặc mã" />
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
                                                    <span v-if="product.discount_percent > 0"
                                                        :class="{ 'text-decoration-line-through': product.discount_percent > 0 }">
                                                        {{ formatPrice(product.price) }}
                                                    </span>
                                                    <span :class="{ 'ms-2 text-danger': product.discount_percent > 0 }">
                                                        {{ formatPrice(product.price_final) }}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <table class="table dataTable">
                            <thead>
                                <tr role="row">
                                    <th width="4%">#</th>
                                    <th width="8%">ID</th>
                                    <th width="26%">Tên sản phẩm</th>
                                    <th width="15%">Phân loại</th>
                                    <th width="14%">Giá bán</th>
                                    <th width="10%">Số lượng</th>
                                    <th width="16%">Thành tiền</th>
                                    <th width="6%"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in soldAtStoreLocal.items" :key="product">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ product.product_id }}</td>
                                    <td>{{ product.product_name }}</td>
                                    <td>
                                        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            {{ product.classifySelected }}
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li v-for="item in product.classify" :key="item">
                                                <a @click="item.total_final !== 0 ? optionClassify(index, item) : null"
                                                    class="dropdown-item" href="#">
                                                    <span class="d-flex align-items-end"
                                                        :class="{ 'text-decoration-line-through': item.total_final == 0 }">
                                                        <span class="filters-panel-group-item__item-box circle"
                                                            :style="`background-color: ${item.color}`"></span>
                                                        {{ item.color_name }}, {{ item.size }}
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                    <td>
                                        <input type="text" :value="formattedPrice(product.price_final)" disabled>
                                    </td>
                                    <td class="bg-import">
                                        <input type="text" :value="formattedPrice(product.quantity)"
                                            @input="updateQuantity(index, $event)" @keypress="validateKeyPress">
                                    </td>
                                    <td>
                                        <input type="text" :value=computedTotalItem(index) disabled />
                                    </td>
                                    <td>
                                        <a class="remove-option" @click="removeProduct(product)">
                                            <img src="/images/icon/btndelete.png" alt="">
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr v-if="soldAtStoreLocal.items.length == 0">
                                    <th colspan="8" class="text-center text-bold">Chưa có sản phẩm nào</th>
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
                <div class="import-product import-customer">
                    <div class="import-product__search">
                        <div class="search-input" @click="viewSearch1">
                            <a class="search-btn"><i class="bi bi-search"></i></a>
                            <input type="text" v-model="keyword1" placeholder="Tìm khách hàng theo tên hoặc số điện thoại" />
                            <a class="search-btn"><i class="bi bi-plus" @click="openModalCustomer"></i></a>
                        </div>
                        <div class="sub-menu-search customer">
                            <ul id="nav" class="navbar-nav ms-aut">
                                <li class="nav-item" v-for="customer in filteredCutomers" :key="customer"
                                    @click="chooseCustomer(customer)">
                                    <div class="d-flex justify-content-between">
                                        <span>Khách hàng:
                                            <span class="text-customer"> {{ customer.name }} - {{ customer.phone }}</span>
                                        </span>
                                        <span class="type-price">Giá thường</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div class="form-group">
                            <div class="form-group__container border-round">
                                <label for="date">Khách hàng:</label>
                                <div class="customer-level">
                                    <span class="text-customer">{{ customerSelected.name }} - {{ customerSelected.phone }} </span>
                                    <span v-if="customerSelected">
                                        <span class="point">{{ (customerSelected.user.point).toLocaleString() }} điểm</span> 
                                        <span class="level">{{ customerSelected.user.level }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="border-round mb-3">
                            <div class="form-group">
                                <div class="option-filter">
                                    <div>
                                        <a @click="optionPaymentMethod('Tiền mặt')"
                                            :class="{ active: this.soldAtStoreLocal.payment_method == 'Tiền mặt' }">
                                            Tiền mặt
                                        </a>
                                        <a @click="optionPaymentMethod('Chuyển khoản')"
                                            :class="{ active: this.soldAtStoreLocal.payment_method == 'Chuyển khoản' }">
                                            Chuyển khoản
                                        </a>
                                        <a class="form-group__date">
                                            <input name="date" type="datetime-local" class="datepicker d-block" disabled
                                                    v-model="soldAtStoreLocal.receipted_at">
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-group__container">
                                    <label for="form">Tổng tiền:</label>
                                    <span>{{ formattedTotalPrice }}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-group__container">
                                    <label for="form">Sản phẩm giảm giá</label>
                                    <span>{{ computedTotalDiscountProduct.toLocaleString() }}</span>
                                </div>
                            </div>
                            <div class="form-group" v-if="customerSelected.user">
                                <div class="form-group__container">
                                    <div class="checkout-voucher">
                                        <label for="form" @click="viewVoucher">
                                            <img src="/images/icon/uudai.svg" alt="" width="25" class="me-1">
                                            Chọn Voucher
                                            <span class="voucher" v-if="selectedVoucher">{{ selectedVoucher.name }}</span>
                                        </label>
                                        <div class="menu-voucher">
                                            <h4>Chengivy Voucher</h4>
                                            <ul id="nav" class="navbar-nav ms-aut">
                                                <li class="nav-item" v-for="voucher in vouchers" :key="voucher"
                                                    :class="{ 'disable': soldAtStoreLocal.total_value < voucher.level }">
                                                    <div class="nav-item__container">
                                                        <div class="nav-item__item">
                                                            <div class="nav-item__image">
                                                                <div v-if="voucher.image" class="image">
                                                                    <img :src="voucher.image" alt="">
                                                                </div>
                                                                <div v-else class="no-image">
                                                                    <img src="/images/logo/logo.jpg" alt="" width="70">
                                                                </div>
                                                            </div>
                                                            <div class="nav-item__info">
                                                                <p>{{ voucher.name }}</p>
                                                                <p>{{ voucher.condition }}</p>
                                                                <p v-if="voucher.date_start">{{
                                                                    formattedDate(voucher.date_start) }} ~ {{
                                                                    formattedDate(voucher.date_end) }}</p>
                                                                <p v-if="voucher.quantity_initial">
                                                                    <span></span>
                                                                    <span
                                                                        :style="{ width: (100 - voucher.quantity_remain * 100 / voucher.quantity_initial) + '%' }"></span>
                                                                </p>
                                                                <p v-if="voucher.quantity_initial">Đã dùng {{ 100 -
                                                                    voucher.quantity_remain * 100 / voucher.quantity_initial }}%
                                                                </p>
                                                            </div>
                                                            <div class="nav-item__button">
                                                                <span v-if="selectedVoucher == voucher"
                                                                    @click="selectVoucher(voucher)">
                                                                    <i class="fa fa-check"></i>
                                                                </span>
                                                                <button v-else @click="selectVoucher(voucher)">Lưu</button>
                                                            </div>
                                                        </div>
                                                        <div class="nav-item__plus" v-if="soldAtStoreLocal.total_value < voucher.level">
                                                            <span><i class="fa fa-exclamation-circle"></i></span>
                                                            <span>Mua thêm {{ formatPrice(voucher.level - soldAtStoreLocal.total_value) }} để
                                                                sử dụng Voucher</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <span>{{ discountVoucher.toLocaleString() }}</span>
                                </div>
                            </div>
                            <div class="form-group" v-if="customerSelected.user">
                                <div class="form-group__container">
                                    <div class="">
                                        <label for="form" @click="viewVoucher">
                                            <img src="/images/icon/tichdiem.svg" alt="" width="25" class="me-1">
                                            Sử dụng điểm
                                            <div class="discount-point">
                                                <span>-{{ formatPrice(computedDiscountPoint) }}</span>
                                                <span class="border-left">
                                                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 1 5 35" style="fill: #da4343;"><path d="M0 0v2.27a2 2 0 010 3.46v2.54a2 2 0 010 3.46v2.54a2 2 0 010 3.46V19h2v-1h-.76A2.99 2.99 0 001 13.76v-1.52a3 3 0 000-4.48V6.24a3 3 0 000-4.48V1h1V0H0z"></path></svg>
                                                </span>
                                                <span class="border-right">
                                                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 1 5 35" style="fill: #da4343;"><path d="M0 0v2.27a2 2 0 010 3.46v2.54a2 2 0 010 3.46v2.54a2 2 0 010 3.46V19h2v-1h-.76A2.99 2.99 0 001 13.76v-1.52a3 3 0 000-4.48V6.24a3 3 0 000-4.48V1h1V0H0z"></path></svg>
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                    <div class="form-group__input">
                                        <input type="text" class="form-control point-input" v-model="formattedPoint"
                                            placeholder="Nhập số điểm" @input="limitInputValue"/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-group__container">
                                    <label for="form">Tổng giảm giá
                                        <span class="voucher" v-if="customerSelected && (customerSelected.user.level=='SILVER' || customerSelected.user.level=='GOLD')">Giảm 5% tổng hóa đơn</span>
                                        <span class="voucher" v-if="customerSelected && (customerSelected.user.level=='PLATINUM' || customerSelected.user.level=='DIAMOND')">Giảm 10% tổng hóa đơn</span>
                                    </label>
                                    <span class="text-danger">{{ computedTotalDiscount.toLocaleString() }}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-group__container">
                                    <label for="form">Tổng giá trị</label>
                                    <span class="into-money">{{ formattedTotalValue }}</span>
                                </div>
                            </div>
                            <div class="form-group" v-if="soldAtStoreLocal.payment_method=='Tiền mặt'">
                                <div class="form-group__container">
                                    <div class="form-group__label">
                                        <label for="form">Thanh toán</label>
                                    </div>
                                    <div class="form-group__input">
                                        <input type="text" class="form-control pay" v-model="formattedPay"
                                            @keypress="validateKeyPress" />
                                        <ErrorMessage name="pay" class="error-feedback" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" v-if="soldAtStoreLocal.payment_method=='Tiền mặt'">
                                <div class="form-group__container">
                                    <label for="form">Tiền thừa</label>
                                    <span class="text-success">{{ computedRemain.toLocaleString() }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group float-end pe-4 mt-1">
                            <button type="button" class="btnAdd" @click="submitSoldAtStore">
                                <i class="fa fa-plus"></i>Thực hiện
                            </button>
                            <button type="button" class="btnBack ms-2" @click="reset">
                                <i class="fa fa-refresh"></i>Hủy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Form>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import ProductService from "@/services/admin/product.service";
import CustomerService from "@/services/admin/customer.service";
import ProductModal from "@/components/admin/products/ProductModal.vue";
import CustomerModal from "@/components/admin/customers/CustomerModal.vue";
import VoucherService from "@/services/admin/voucher.service";
import { formatPrice } from '../../../utils';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        ProductModal,
        CustomerModal
    },
    emits: ["submit:soldAtStore", "delete:soldAtStore"],
    props: {
        soldAtStore: { type: Object, required: true }
    },
    data() {
        return {
            soldAtStoreLocal: this.soldAtStore,
            showModal: false,
            modalProduct: false,
            modalCustomer: false,
            products: [],
            keyword: "",
            keyword1: "",
            value: 0,
            customers: [],
            customerSelected: "",
            vouchers: [],
            discountVoucher: 0,
            discountPoint: 0,
            selectedVoucher: null,
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
        filteredCutomers() {
            if (!this.keyword1) return this.customers;
            return this.customers.filter(item =>
                item.name.toLowerCase().includes(this.keyword1.toLowerCase()) ||
                item.phone.toString().toLowerCase().includes(this.keyword1.toLowerCase())
            );
        },
        computedTotalItem() {
            return index => {
                const item = this.soldAtStoreLocal.items[index];
                return ((item.price_final * item.quantity) || 0).toLocaleString();
            };
        },
        computedTotalDiscountProduct() {
            let total = 0;
            for (const item of this.soldAtStoreLocal.items) {
                total += (item.price - item.price_final) * item.quantity;
            }
            return total;
        },
        computedTotalDiscount() {
            let totalDiscount = 0;
            if(this.customerSelected && (this.customerSelected.user.level == 'GOLD' || this.customerSelected.user.level == 'SILVER')) {
                if(this.selectedVoucher) 
                    totalDiscount = (this.soldAtStoreLocal.total_price-this.computedTotalDiscountProduct)*0.05 + this.computedTotalDiscountProduct + this.computedDiscountPoint + this.discountVoucher;
                else totalDiscount = (this.soldAtStoreLocal.total_price-this.computedTotalDiscountProduct)*0.05 + this.computedTotalDiscountProduct + this.computedDiscountPoint;
            } else if(this.customerSelected && (this.customerSelected.user.level == 'PLATINUM' || this.customerSelected.user.level == 'DIAMOND')) {
                if(this.selectedVoucher) 
                    totalDiscount = (this.soldAtStoreLocal.total_price-this.computedTotalDiscountProduct)*0.1 + this.computedTotalDiscountProduct + this.computedDiscountPoint + this.discountVoucher;
                else totalDiscount = (this.soldAtStoreLocal.total_price-this.computedTotalDiscountProduct)*0.1 + this.computedTotalDiscountProduct + this.computedDiscountPoint;
            }
            return totalDiscount;
        },
        computedRemain() {
            let remain = this.soldAtStoreLocal.pay - this.soldAtStoreLocal.total_value;
            if(remain>0) {
                return remain;
            } else {
                return this.soldAtStoreLocal.remain;
            }
        },
        formattedTotalPrice: {
            get() {
                // Format the number using commas as thousands separators
                return this.soldAtStoreLocal.total_price.toLocaleString();
            },
            set(newValue) {
                // Remove commas from the input and update the raw numeric value
                this.soldAtStoreLocal.total_price = parseFloat(newValue.replace(/,/g, ""));
            },
        },
        formattedTotalValue: {
            get() {
                // Format the number using commas as thousands separators
                return this.soldAtStoreLocal.total_value.toLocaleString();
            },
            set(newValue) {
                // Remove commas from the input and update the raw numeric value
                this.soldAtStoreLocal.total_value = parseFloat(newValue.replace(/,/g, ""));
            },
        },
        formattedPay: {
            get() {
                // Format the number using commas as thousands separators
                return this.soldAtStoreLocal.pay.toLocaleString();
            },
            set(newValue) {
                // Remove commas from the input and update the raw numeric value
                this.soldAtStoreLocal.pay = parseFloat(newValue.replace(/,/g, ""));
            },
        },
        formattedPoint: {
            get() {
                // Format the number using commas as thousands separators
                return this.discountPoint.toLocaleString();
            },
            set(newValue) {
                // Remove commas from the input and update the raw numeric value
                this.discountPoint = parseFloat(newValue.replace(/,/g, ""));
            },
        },
        calculatedTotalQuantity() {
            let total = 0;
            for (const item of this.soldAtStoreLocal.items) {
                total += item.quantity;
            }
            return total.toLocaleString();
        },
        calculatedIntoMoney() {
            let total = 0;
            for (const item of this.soldAtStoreLocal.items) {
                total += item.quantity * item.price;
            }
            return total.toLocaleString();
        },
        computedDiscountPoint() {
            if(this.discountPoint) 
                return this.discountPoint*1000;
            else return 0;
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
        updateQuantity(index, event) {
            const newValue = event.target.value.replace(/,/g, "");
            this.soldAtStoreLocal.items[index].quantity = parseFloat(newValue);
            this.updateIntoMoney();
        },
        updateIntoMoney() {
            let total = 0;
            for (const item of this.soldAtStoreLocal.items) {
                total += (item.price * item.quantity) || 0;
            }
            this.soldAtStoreLocal.total_price = total;
            this.soldAtStoreLocal.total_value = total - this.computedTotalDiscount;
        },
        formattedPrice(value) {
            return value.toLocaleString();
        },
        formatPrice,
        submitSoldAtStore() {
            this.$emit("submit:soldAtStore", this.soldAtStoreLocal);
            // this.discountVoucher = 0;
            // this.customerSelected = "";
        },
        async closeModal() {
            this.showModal = false;
            this.modalProduct = false;
            this.modalCustomer = false;
            this.products = await ProductService.getAll();
            this.customers = await CustomerService.getAll();
        },
        openModalProduct() {
            this.showModal = true;
            this.modalProduct = true;
        },
        openModalCustomer() {
            this.showModal = true;
            this.modalCustomer = true;
        },
        viewSearch() {
            const navbarToggler = document.querySelector(".sub-menu-search");
            navbarToggler.classList.toggle("d-block");
        },
        viewSearch1() {
            const navbarToggler = document.querySelector(".sub-menu-search.customer");
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
            const index = this.soldAtStoreLocal.items.findIndex(
                item => item.product_id === product.id);
            let classify = [];
            let lastItem = product.inventories[product.inventories.length - 1].items;

            lastItem.forEach(item => {
                classify.push({
                    color_id: item.color_id,
                    color: item.color,
                    color_name: item.color_name,
                    size_id: item.size_id,
                    size: item.size_name,
                    total_final: item.total_final
                });
            });

            // Sort the classify array by color_name
            classify.sort((a, b) => a.color_name.localeCompare(b.color_name));

            if (index === -1) {
                this.soldAtStoreLocal.items.push({
                    product_id: product.id,
                    product_name: product.name,
                    product_image: product.image,
                    price: product.price,
                    price_final: product.price_final,
                    quantity: 0,
                    classify: classify,
                    classifySelected: "Chọn phân loại"
                });

            }
        },
        chooseCustomer(customer) {
            this.customerSelected = customer;
            let currentUserId = customer.user_id;
            if(currentUserId) {
                this.soldAtStoreLocal.user_id = currentUserId;
            } else {
                this.discountVoucher = 0;
            }
            this.soldAtStoreLocal.name_receiver = customer.name;
            this.soldAtStoreLocal.phone_receiver = customer.phone;
            this.retrieveVoucher(currentUserId);
        },
        optionClassify(index, item) {
            this.soldAtStoreLocal.items[index].classifySelected = item.color_name + ", " + item.size;
            this.soldAtStoreLocal.items[index].color = item.color_name;
            this.soldAtStoreLocal.items[index].color_id = item.color_id;
            this.soldAtStoreLocal.items[index].size = item.size;
            this.soldAtStoreLocal.items[index].size_id = item.size_id;
        },
        removeProduct(product) {
            const index = this.soldAtStoreLocal.items.findIndex(
                item => item.product_id === product.product_id);
            if (index !== -1) {
                this.soldAtStoreLocal.items.splice(index, 1);
            }

            this.updateIntoMoney();
        },
        async retrieveCustomers() {
            try {
                this.customers = await CustomerService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveVoucher(currentUserId) {
            try {
                if(currentUserId) {
                    this.vouchers = await VoucherService.getByUser(currentUserId);
                }
            } catch (error) {
                console.log(error);
            }
        },
        formattedDate(originalDate) {
            const date = new Date(originalDate);

            // Lấy giờ, phút, giây
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            // Lấy ngày, tháng, năm
            const day = date.getDate();
            const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
            const year = date.getFullYear();

            const formatted = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year} ${hours}:${minutes}`;

            return formatted;
        },
        viewVoucher() {
            const navbarToggler = document.querySelector(".menu-voucher");
            navbarToggler.classList.toggle("d-block");
        },
        selectVoucher(voucher) {
            if(this.selectedVoucher !== voucher) {
                this.selectedVoucher = voucher;
                this.soldAtStoreLocal.voucher_id = voucher.id;
            } else {
                this.selectedVoucher = null;
                this.soldAtStoreLocal.voucher_id = 0;
                this.discountVoucher = 0;
            }

            this.discountVoucher = 
                (this.soldAtStoreLocal.total_price - this.computedTotalDiscountProduct)
                *(this.selectedVoucher.discount/100);
            
            this.updateIntoMoney();
        },
        optionPaymentMethod(paymentMethod) {
            this.soldAtStoreLocal.payment_method = paymentMethod;
        },
        limitInputValue() {
            let checkPoit = this.discountPoint > this.customerSelected.user.point;
            if (checkPoit) {
                this.discountPoint = this.customerSelected.user.poin;
            }
            let totalPrice = this.soldAtStore.total_price - this.computedTotalDiscountProduct;
            if(this.customerSelected && (this.customerSelected.user.point == 'SILVER' || this.customerSelected.user.point == 'GOLD')) {
                totalPrice = totalPrice*0.05;
            } else if(this.customerSelected && (this.customerSelected.user.point == 'PLATINUM' || this.customerSelected.user.point == 'DIAMOND')) {
                totalPrice = totalPrice*0.1;
            }
            let money = totalPrice - this.discountProduct - this.discountVoucher;
            if(this.totalValue<0) {
                this.discountPoint = parseInt(money/1000);
            }
        },
            
    },
    mounted() {
        this.getProductAll();
        this.retrieveCustomers();
    },
};
</script>
<style scoped>
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
    overflow: hidden;
    overflow-y: scroll;
    height: 480px;
    scrollbar-width: none;
}

.import .import-product::-webkit-scrollbar {
    width: 0;
}

.bg-import {
    background-color: #ececec !important;
}

.import-customer .import-product__search {
    margin-left: 0;
}
.import-customer .search-input {
    width: 100%;
}

.import-customer .sub-menu-search.customer {
    margin-left: 20px;
}

.import-customer .import-product__search {
    float: unset;
}

.import-customer .import-product__search {
    margin-bottom: 0;
}

.import-customer .navbar-nav .nav-item {
    margin-right: 0;
}

.type-price {
    color: red;
}

.text-customer {
    font-weight: bold;
    color: #3d3d3d;
    font-size: 17px;
}

.import-customer .sub-menu-search {
    width: 90%;
    max-width: 90%;
}

.import-customer .sub-menu-search .navbar-nav {
    max-width: 100%;
}

.checkout-voucher {
    position: relative;
}

.checkout-voucher label {
    text-decoration: underline;
    cursor: pointer;
}

.checkout-voucher .menu-voucher {
    top: unset;
    background-color: #fffef8;
    width: 360px;
}

.checkout-voucher .menu-voucher h4 {
    padding: 6px 20px 0;
    font-size: 15px;
}

.checkout-voucher .menu-voucher .navbar-nav {
    width: 100%;
    padding: 0 12px;
    margin-top: 0;
    max-width: unset;
}

.checkout-voucher .menu-voucher .nav-item {
    border-left: none;
    display: flex;
    width: 100%;
    position: relative;
    margin-bottom: 10px;
    margin-right: 0;
    padding: 0 !important;
    background-color: #fff;
}

.checkout-voucher .menu-voucher .nav-item.disable .nav-item__item {
    opacity: 0.5;
}

.checkout-voucher .menu-voucher .nav-item .nav-item__plus {
    width: 100%;
    height: 40px;
    background-color: #fff8e4;
    margin-top: 1px;
    display: flex;
    padding: 10px;
}

.checkout-voucher .menu-voucher .nav-item .nav-item__plus span {
    color: #fa6338;
    margin-right: 6px;
}

.nav-item__container {
        width: 100%;
        position: relative;
    }
    .nav-item__item {
        height: 136px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        box-shadow: var(--vc-template-box-shadow,.125rem .125rem .3125rem rgba(0,0,0,.07));
        border-bottom: 0.0625rem solid var(--vc-card-left-border-color,#e8e8e8);
        border-bottom-left-radius: 0.125rem;
        border-top: 0.0625rem solid var(--vc-card-left-border-color,#e8e8e8);
        border-top-left-radius: 0.125rem;
    }
    .nav-item__image {
        width: 25%;
        border-right: 0.0625rem dashed #d7d7d7;
        margin-right: 6px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg,transparent calc(var(--vc-card-radius, .25rem)*2),var(--vc-card-left-border-color,#dfdfdf) 0) 0 0.0625rem /0.0625rem calc(var(--vc-card-radius, .25rem)*2 + var(--vc-card-gap, .125rem)) repeat-y,radial-gradient(circle at 0 var(--vc-card-radius,.25rem),transparent 0,transparent calc(var(--vc-card-radius, .25rem) - 0.0625rem),var(--vc-card-left-border-color,#dfdfdf) 0,var(--vc-card-left-border-color,#dfdfdf) var(--vc-card-radius,.25rem),var(--vc-card-left-fill-color,#fff) 0) 0 0.0625rem /100% calc(var(--vc-card-radius, .25rem)*2 + var(--vc-card-gap, .125rem)) repeat-y;
    }
    .nav-item__image .no-image {
        border: 1px solid #ccc;
        border-radius: 50%;
        width: 90px;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .nav-item__image .image { 
        padding: 0 10px;
    }
    .nav-item__info {
        width: 55%;
        padding: 10px 0;
    }
    .nav-item__info p {
        margin: 0;
    }
    .nav-item__info p:first-child {
        font-weight: bold;
        color: #fa6338;
    }
    .nav-item__info p:last-child {
        color: #fa6338;
    }
    .nav-item__info p:nth-child(3) {
        color: #666;
    }
    .nav-item__info p:nth-child(4) {
        width: 100%;
        position: relative;
    }
    .nav-item__info p:nth-child(4) span {
        width: 100%;
        height: 6px;
        background-color: #ccc;
        border-radius: 4px;
    }
    .nav-item__info p:nth-child(4) span:last-child {
        position: absolute;
        content: "";
        top: 10.5px;
        left: 0;
        background-color: #fa6338;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .nav-item__button {
        width: 15%;
    }
    .nav-item__button span {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: #337ab7;
        float: right;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
    }
    .nav-item__button span i {
        color: #fff;
        font-size: 10px;
        line-height: 10px;
    }
    .nav-item__button button {
        padding: 2px 14px;
        border: 0;
        background-color: #337ab7;
        color: #fff;
        border-radius: 2px;
        font-size: 13px;
    }

    .form-group__date input {
        width: 140px;
        font-size: 14px;
    }
    .content .option-filter .form-group__date {
        padding: 0;
    }

    .content .option-filter {
        margin: 0 -30px;
    }

    .form-group__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
    }
    .form-group__container>span {
        font-weight: bold;
        color: #000;
        font-size: 16px;
    }
    .form-group__container .into-money {
        color: #0000c7;
        font-size: 24px;
    }
    .border-round {
        background-color: #ecf2fc;
        height: auto;
        padding: 10px 30px;
        border-radius: 10px;
        border: 1px solid #e0e5ea;
    }
    .border-round:nth-child(2) {
        padding-top: 0;
    }
    .import-customer .search-input input {
        margin-bottom: 8px;
    }

    .form-group__container .pay {
        text-align: right;
        font-weight: bold;
        color: #000;
        font-size: 15px;
    }
    .form-group .point-input {
        text-align: right;
        color: #000;
        width: 120px;
        float: right;
    }
    .voucher {
        margin-left: 10px;
        color: #da4343;
        border: 1px solid #da4343;
        height: 30px;
        display: inline-block;
        padding: 4px 10px;
        border-radius: 6px;
    }
    .level {
        display: inline-block;
        width: 100px;
        height: 24px;
        color: #000;
        background-color: #f1cc25;
        padding: 3px 10px;
        border-radius: 16px;
        font-weight: 600;
        text-align: center;
        margin-top: 10px;
    }
    .customer-level {
        display: flex;
        flex-direction: column;
        align-items: end;
    }
    .point {
        font-weight: bold;
        color: #97243c !important;
        font-size: 17px;
        margin-right: 10px;
    }
    .discount-point {
        color: #da4343;
        border-top: 1px solid #da4343;
        border-bottom: 1px solid #da4343;
        position: relative;
        height: 30px;
        padding: 3px 10px 0 10px;
        display: inline-block;
    }
    .discount-point svg {
        width: 10px;
        height: 55px
    }
    .discount-point .border-left,
    .discount-point .border-right {
        position: absolute;
        content: "";
        top: 0;
        height: 100%;
    }
    .discount-point .border-left {
        left: 0;
    }
    .discount-point .border-right {
        right: -9px;
    }
    .form-group .form-group__container .form-group__input {
        width: auto;
    }
</style>
