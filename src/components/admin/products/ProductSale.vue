<template>
    <ProductSaleModal v-if="showModal" :showModal="showModal" 
        :productsSale="productsSale" :products="products" @closeModal="closeModal"/>

    <section class="content">
        <div class="row center-block">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-body">
                        <div class="group-btn">
                            <div class="d-flex align-items-center justify-content-end mb-3">
                                <input type="button" name="btnBack" value="Làm mới" @click="refreshList()">
                                <input type="button" name="btnAdd" value="Thêm mới" @click="openModal">
                                <input type="button" name="btnEdit" value="Sửa" @click="openModal">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 table-responsive">
                                <table class="example1 table dataTable">
                                    <thead>
                                        <tr role="row">
                                            <th width="6%" data-orderable="false">ID</th>
                                            <th width="31%">Sản phẩm</th>
                                            <th width="10%">Có sẵn</th>
                                            <th width="12%">Giá nhập</th>
                                            <th width="12%">Giá bán</th>
                                            <th width="10%">Tỷ lệ giảm</th>
                                            <th width="12%">Giá giảm</th>
                                            <th width="7%">Chọn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr role="row" v-for="(product, index) in products" :key="product">
                                            <td>{{ product.id }}</td>
                                            <td>
                                                <img v-if="product.image" :src="product.image" alt="" width="50" height="50">
                                                <span class="ms-3">{{ product.name }}</span>
                                            </td>
                                            <td>{{ (product.total_final).toLocaleString() }}</td>
                                            <td>{{ formatPrice(product.price_purchase) }}</td>
                                            <td>{{ formatPrice(product.price) }}</td>
                                            <td>{{product.discount_percent}}%</td>
                                            <td>
                                                <span class="text-danger">{{ formatPrice(product.price_final) }}</span>
                                            </td>
                                            <td class="text-center">
                                                <input type="checkbox" @change="idSelected(product)" :checked="selectedProducts.includes(product)">
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="7" class="text-center text-bold">Chọn tất cả</th>
                                            <th class="text-center"><input type="checkbox" @change="idAllSelected()"></th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
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
import ProductSaleModal from "@/components/admin/products/ProductSaleModal.vue";
import { formatPrice } from '@/utils';

export default {
    name: 'inventory',
    components: {
        ProductSaleModal
    },
    data() {
        return {
            products: [],
            selectedProducts: [],
            showModal: false,
            productsSale: []
        };
    },
    methods: {
        formatPrice,
        async retrieveProducts() {
            try {
                this.products = await ProductService.getSales();
                this.$nextTick(() => {
                    initializeDataTable();
                });
            } catch (error) {
                console.log(error);
            }
        },
        idSelected(product) {
            const index = this.selectedProducts.indexOf(product);
            if (index === -1) {
                this.selectedProducts.push(product);
            } else {
                this.selectedProducts.splice(index, 1);
            }
        },
        idAllSelected() {
            if(this.selectedProducts.length == this.productsList.length) {
                this.selectedProducts.splice(0, this.selectedProducts.length); // Bỏ hết các phần tử trong selectedProducts
            } else if(this.selectedProducts.length) {
                this.selectedProducts.splice(0, this.selectedProducts.length);
                this.products.forEach(product => {
                    this.selectedProducts.push(product);
                });
            } else {
                this.products.forEach(product => {
                    this.selectedProducts.push(product);
                });
            }
        },
        openModal() {
            if(this.selectedProducts) {
                this.productsSale = this.selectedProducts;
            }
            this.showModal = true;
        },
        async closeModal() {
            this.showModal = false;
            this.products = await ProductService.getSales();
        },
    },
    mounted() {
        this.retrieveProducts();
    },
};
</script>