<template>
    <CategoryModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :categoryID="categoryID"/>
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
                                <input type="button" name="btnDelete" value="Xóa" @click="deleteCategory()">
                                <input type="button" id="exportPrintBtn" name="btnPrint" value="In">
                                <input type="button" id="exportExcelBtn" name="btnExcel" value="Xuất Excel">
                            </div>
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
                                    <button type="button" class="btnDelete" @click="deleteCategory()">
                                        <i class="fa fa-trash"></i>Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 table-responsive">
                                <CategoryList 
                                    v-if="filteredCategoriesCount > 0" 
                                    :categories="filteredCategories"
                                    :selectedIds="selectedIds" 
                                    :showModal="showModal"
                                    @update-modal="updateShowModal"
                                    :categoryID="categoryID"
                                    @update-categoryID="updateCategory"
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
import CategoryList from "@/components/admin/categories/CategoryList.vue";
import CategoryService from "@/services/admin/category.service";
import CategoryModal from "@/components/admin/categories/CategoryModal.vue";

export default {
    components: {
        CategoryList,
        CategoryModal
    },
    name: 'category',
    data() {
        return {
            categories: [],
            categoryID: null,
            selectedIds: [],
            showModal: false
        };
    },
    computed: {
        filteredCategories() {
            return this.categories;
        },
        filteredCategoriesCount() {
            return this.filteredCategories.length;
        },
    },
    methods: {
        async retrieveCategories() {
            try {
                this.categories = await CategoryService.getAll();
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
            this.retrieveCategories();
            this.selectedIds = [];
        },
        goToAddCategory() {
            this.$router.push({ name: "category.add" });
        },
        deleteCategory() {
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
                    CategoryService.delete(this.selectedIds).then((res) => {
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
            this.categoryID = null;
        },
        updateShowModal(value) {
            this.showModal = value;
        },
        updateCategory(value) {
            this.categoryID = value;
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
