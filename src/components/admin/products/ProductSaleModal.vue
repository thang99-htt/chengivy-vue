<template>
    <div class="modal d-block widden">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold">Sản phẩm giảm giá</h4>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="box box-info">
                        <div class="box-body">
                            <div class="product-sale">
                                <div class="search-input" @click="viewSearch">
                                    <a class="search-btn"><i class="bi bi-search"></i></a>
                                    <input type="text" v-model="keyword" placeholder="Tìm kiếm sản phẩm"/>
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
                            <div class="product-sale__button">
                                <button type="button" class="btnSave" @click="submitProduct">
                                    <i class="fa fa-plus"></i>Thực hiện
                                </button>
                            </div>
                            <div class="product-sale__table">
                                <table class=" example1 table dataTable">
                                    <thead>
                                        <tr role="row">
                                            <th width="6%" data-orderable="false">ID</th>
                                            <th width="31%">Sản phẩm</th>
                                            <th width="10%">Có sẵn</th>
                                            <th width="12%">Giá nhập</th>
                                            <th width="12%">Giá bán</th>
                                            <th width="10%">Tỷ lệ giảm</th>
                                            <th width="12%">Giá giảm</th>
                                            <th width="7%"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr role="row" v-for="(product, index) in productsSale" :key="product">
                                            <td>{{ product.id }}</td>
                                            <td>
                                                <img v-if="product.image" :src="product.image" alt="" width="100"
                                                    height="70">
                                                <span class="ms-3">{{ product.name }}</span>
                                            </td>
                                            <td>{{ (product.total_final).toLocaleString() }}</td>
                                            <td>{{ formatPrice(product.price_purchase) }}</td>
                                            <td>
                                                <input type="text" :value="formattedPrice(product.price)"
                                                @input="updatePrice(index, $event)" @keypress="validateKeyPress1">
                                            </td>
                                            <td>
                                                <input type="text" :value="formatPercentage(product.discount_percent)"  class="bg-input"
                                                    @input="updateDisount(index, $event)" @keypress="validateKeyPress">
                                            </td>
                                            <td>
                                                <span class="text-danger fw-bold">{{ formatPrice(product.price_final) }}</span>
                                            </td>
                                            <td class="remove-option" @click="removeProduct(product)">Xóa</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import { initializeDataTable } from '../../../utils';
import ProductService from "@/services/admin/product.service";
import { formatPrice } from '@/utils';

export default {
    name: 'inventory',
    props: {
        products: { type: Array, required: true },
        productsSale: { type: Array, required: true },
        selectedProducts: { type: Array, required: true }
    },
    data() {
        return {
            productsAll: [],
            keyword: "",
        };
    },
    computed: {
        filteredProducts() {
            if (!this.keyword) return this.productsAll;
            return this.productsAll.filter(item =>
                item.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
                item.id.toString().toLowerCase().includes(this.keyword.toLowerCase())
            );
        },
    },
    methods: {
        formatPrice,
        formatPercentage(value) {
            return `${value}%`;
        },
        async getAll() {
            try {
                this.productsAll = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        viewSearch() {
            const navbarToggler = document.querySelector(".sub-menu-search");
            navbarToggler.classList.toggle("d-block");
        },
        chooseProduct(product) {
            const existsInProductsSale = this.productsSale.some(
                item => item.id === product.id
            );

            const existsInProducts = this.products.some(
                item => item.id === product.id
            );

            if (!existsInProductsSale && !existsInProducts) {
                this.productsSale.push({
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    price_final: product.price_final,
                    price_purchase: product.price_purchase,
                    discount_percent: 0,
                    total_final: product.total_final
                });
            }
        },
        updatePrice(index, event) {
            const newValue = event.target.value.replace(/,/g, "");
            this.productsSale[index].price = parseFloat(newValue);
            this.productsSale[index].price_final = parseFloat(newValue) * 
                    (1 - this.productsSale[index].discount_percent / 100);
        },
        formattedPrice(value) {
            return value.toLocaleString();
        },
        updateDisount(index, event) {
            const newValue = event.target.value;
            this.productsSale[index].discount_percent = parseFloat(newValue);
            this.productsSale[index].price_final = this.productsSale[index].price * 
                    (1 - parseFloat(newValue) / 100);
        },
        validateKeyPress(event) {
            // Allow only numeric characters and backspace
            const charCode = (event.which) ? event.which : event.keyCode;
            
            // Get the current input value and the new character being typed
            const currentValue = event.target.value;
            const newChar = String.fromCharCode(charCode);
            
            // Concatenate the new character to the current value and check if it exceeds 100
            const newValue = currentValue + newChar;
            if (newValue > 100 || (charCode !== 8 && charCode !== 0 && (charCode < 48 || charCode > 57))) {
                event.preventDefault();
            }
        },
        validateKeyPress1(event) {
            // Allow only numeric characters and backspace
            const charCode = (event.which) ? event.which : event.keyCode;
            if (charCode !== 8 && charCode !== 0 && (charCode < 48 || charCode > 57)) {
                event.preventDefault();
            }
        },
        closeModal() {
            this.$emit('closeModal');
            this.productsSale.splice(0, this.productsSale.length);
        },
        removeProduct(product) {
            const index = this.productsSale.findIndex(
                item => item.id === product.id);

            if (index !== -1) {
                this.productsSale.splice(index, 1);
            }
        },
        async submitProduct() {
            const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            });
            try {
                await ProductService.updateProductsSale(this.productsSale);
                Toast.fire({
                    icon: 'success',
                    title: 'Cập nhật sản phẩm giảm giá thành công.'
                });
                this.closeModal();
            } catch (error) {
                console.log(error);
            }
        },

    },
    mounted() {
        this.getAll();
    },
};
</script>

<style scoped>
.product-sale__table {
    display: block;
    min-height: 300px;
}
.product-sale__button {
    float: right;
}
.bg-input {
    background-color: rgb(214, 214, 214);
}
</style>