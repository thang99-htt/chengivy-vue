<template>
    <section class="content">
        <div class="box">
            <div class="box-body">
                <div class="group-btn">
                    <div class="d-flex align-items-center justify-content-end mb-4">
                        <div>
                            <button type="button" class="btnAdd" @click="statusUpdate">
                                <i class="fa fa-eye"></i>Đăng bán
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-sm-12 table-responsive">
                        <table class="example1 table dataTable">
                            <thead>
                                <tr role="row">
                                    <th width="6%" data-orderable="false">ID</th>
                                    <th width="35%">Sản phẩm</th>
                                    <th width="12%">Có sẵn</th>
                                    <th width="14%">Giá nhập</th>
                                    <th width="14%">Giá bán</th>
                                    <th width="12%">Trạng thái</th>
                                    <th width="7%">Chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(product, index) in products" :key="product">
                                    <td>{{ product.id }}</td>
                                    <td>
                                        <img v-if="product.image" :src="product.image" alt="" width="50"
                                            height="50">
                                        <span class="ms-3">{{ product.name }}</span>
                                    </td>
                                    <td>{{ (product.total_final).toLocaleString() }}</td>
                                    <td>{{ formatPrice(product.price_purchase) }}</td>
                                    <td>{{ formatPrice(product.price) }}</td>
                                    <td>
                                        <button class="btn-sm"
                                            :class="[product.status == 1 ? 'btn-show' : 'btn-hide']"
                                            @click="statusUpdate1(product)">
                                            {{ product.status == 1 ? 'Đăng bán' : 'Ẩn' }}
                                        </button>
                                    </td>
                                    <td class="text-center">
                                        <input type="checkbox" @change="idSelected(product)"
                                            :checked="selectedIds.includes(product.id)">
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colspan="6" class="text-center text-bold">Chọn tất cả</th>
                                    <th class="text-center"><input type="checkbox" @change="idAllSelected()"></th>
                                </tr>
                            </tfoot>
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
            products: [],
            productsSale: [],
            selectedIds: [],
        };
    },
    methods: {
        formatPrice,
        async retrieveProducts() {
            try {
                this.products = await ProductService.getHiddens();
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
            this.retrieveProducts();
            this.selectedIds = [];
        },
        async statusUpdate() {
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
                ProductService.updateHiddens(this.selectedIds);
                Toast.fire({
                    icon: 'success',
                    title: 'Cập nhật thành công.'
                });
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
        },
        async statusUpdate1(product) {
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
            this.selectedIds.push(product.id);
            try {
                ProductService.updateHiddens(this.selectedIds);
                Toast.fire({
                    icon: 'success',
                    title: 'Cập nhật thành công.'
                });
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
        },
        idSelected(product) {
            const index = this.selectedIds.indexOf(product.id);
            if (index === -1) {
                this.selectedIds.push(product.id);
            } else {
                this.selectedIds.splice(index, 1);
            }
        },
        idAllSelected() {
            if (this.selectedIds.length == this.products.length) {
                this.selectedIds.splice(0, this.selectedIds.length); // Bỏ hết các phần tử trong selectedIds
            } else if (this.selectedIds.length) {
                this.selectedIds.splice(0, this.selectedIds.length);
                this.products.forEach(product => {
                    this.selectedIds.push(product.id);
                });
                console.log(this.selectedIds)
            } else {
                this.products.forEach(product => {
                    this.selectedIds.push(product.id);
                });
            }
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>