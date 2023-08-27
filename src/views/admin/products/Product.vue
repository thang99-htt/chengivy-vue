<template>
    <ProductModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :productID="productID"/>

    <section class="content">
        <div class="row center-block">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-body">
                        <div class="group-btn">
                            <div class="d-flex align-items-center justify-content-end mb-3">
                                <input type="button" name="btnBack" value="Làm mới" @click="refreshList()">
                                <input type="button" name="btnAdd" value="Thêm mới" @click="showModal = !showModal">
                                <input type="button" name="btnAdd" value="Thêm từ file">
                                <input type="button" name="btnDelete" value="Xóa" @click="deleteProduct()">
                                <input type="button" id="exportPrintBtn" name="btnPrint" value="In">
                                <input type="button" id="exportExcelBtn" name="btnExcel" value="Xuất Excel">
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
                    ProductService.delete(this.selectedIds).then((res) => {
                        if (res.success) {
                            this.refreshList();
                        }
                    })
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
