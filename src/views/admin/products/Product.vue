<template>
    <ProductModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :productID="productID"/>

    <section class="content">
        <div class="box">
            <div class="box-body">
                <div class="group-btn">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <div>
                            <button type="button" class="btnAdd" @click="showModal = !showModal">
                                <i class="fa fa-plus"></i>Thêm mới
                            </button>
                            <button type="button" class="btnPrint">
                                <i class="fa fa-print"></i>In
                            </button>
                            <button type="button" class="btnAddFile">
                                <i class="fa fa-download"></i>Thêm dữ liệu
                            </button>
                            <button type="button" class="btnExcel">
                                <i class="fa fa-upload"></i>Xuất dữ liệu
                            </button>
                        </div>
                        <div>
                            <button type="button" class="btnBack" @click="refreshList()">
                                <i class="fa fa-refresh"></i>Làm mới
                            </button>
                            <button type="button" class="btnDelete" @click="hiddenProduct()">
                                <i class="fa fa-eye-slash"></i>Ẩn
                            </button>
                            <button type="button" class="btnDelete" @click="deleteProduct()">
                                <i class="fa fa-trash"></i>Xóa
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 table-responsive">
                        <ProductOverview 
                            v-if="filteredProductsCount > 0" 
                            :products="filteredProducts" 
                            :selectedIds="selectedIds" 
                            :showModal="showModal"
                            @update-modal="updateShowModal"
                            :productID="productID"
                            @update-productID="updateProduct"
                        />
                        <!-- <p v-else>Không có sản phẩm nào.</p> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import $ from 'jquery'
import { initializeDataTable } from '../../../utils';
import ProductOverview from "@/components/admin/products/ProductOverview.vue";
import ProductService from "@/services/admin/product.service";
import ProductModal from "@/components/admin/products/ProductModal.vue";

export default {
    components: {
        ProductOverview,
        ProductModal
    },
    name: 'product',
    data() {
        return {
            products: [],
            productID: null,
            selectedIds: [],
            showModal: false
        };
    },
    computed: {
        filteredProducts() {
            return this.products;
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
    },
    methods: {
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();
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
        hiddenProduct() {
            this.$swal.fire({
                title: 'Bạn có chắc?',
                text: "Bạn sẽ không thể hoàn tác lại điều này!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ẩn',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.value) {
                    ProductService.hidden(this.selectedIds);
                    this.refreshList();
                    this.$swal.fire('Đã ẩn thành công!', '', 'success')
                }
            })
        },
        deleteProduct() {
            this.$swal.fire({
                title: 'Bạn có chắc?',
                text: "Bạn sẽ không thể hoàn tác lại điều này!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.value) {
                    ProductService.delete(this.selectedIds);
                    this.refreshList();
                    this.$swal.fire('Đã xóa thành công!', '', 'success')
                }
            })
        },
        closeModal() {
            this.showModal = false;
            this.productID = null;
        },
        updateShowModal(value) {
            this.showModal = value;
        },
        updateProduct(value) {
            this.productID = value;
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
