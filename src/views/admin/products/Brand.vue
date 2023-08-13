<template>
    <BrandModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :brandID="brandID"/>
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
                                <input type="button" name="btnDelete" value="Xóa" @click="deleteBrand()">
                                <input type="button" id="exportPrintBtn" name="btnPrint" value="In">
                                <input type="button" id="exportExcelBtn" name="btnExcel" value="Xuất Excel">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 table-responsive">
                                <BrandList 
                                    v-if="filteredBrandsCount > 0" 
                                    :brands="filteredBrands"
                                    :selectedIds="selectedIds" 
                                    :showModal="showModal"
                                    @update-modal="updateShowModal"
                                    :brandID="brandID"
                                    @update-brandID="updateBrand"
                                />
                                <p v-else>Không có danh mục nào.</p>
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
import BrandList from "@/components/admin/brands/BrandList.vue";
import BrandService from "@/services/admin/brand.service";
import BrandModal from "@/components/admin/brands/BrandModal.vue";

export default {
    components: {
        BrandList,
        BrandModal
    },
    name: 'brand',
    data() {
        return {
            brands: [],
            brandID: null,
            selectedIds: [],
            showModal: false
        };
    },
    computed: {
        filteredBrands() {
            return this.brands;
        },
        filteredBrandsCount() {
            return this.filteredBrands.length;
        },
    },
    methods: {
        async retrieveBrands() {
            try {
                this.brands = await BrandService.getAll();
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
            this.retrieveBrands();
            this.selectedIds = [];
        },
        deleteBrand() {
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
                    BrandService.delete(this.selectedIds).then((res) => {
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
            this.brandID = null;
        },
        updateShowModal(value) {
            this.showModal = value;
        },
        updateBrand(value) {
            this.brandID = value;
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
