<template>
    <section class="content">
        <div class="row center-block">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-body">
                        <div class="group-btn">
                            <div class="d-flex align-items-center justify-content-end mb-3">
                                <input type="button" name="btnBack" value="Làm mới" @click="refreshList()">
                                <input type="button" name="btnAdd" value="Thêm mới" @click="goToAddCategory">
                                <input type="button" name="btnAdd" value="Thêm từ file">
                                <input type="button" name="btnDelete" value="Xóa" @click="deleteCategory()">
                                <input type="button" id="exportPrintBtn" name="btnPrint" value="In">
                                <input type="button" id="exportExcelBtn" name="btnExcel" value="Xuất Excel">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 table-responsive">
                                <CategoryList 
                                    v-if="filteredCategoriesCount > 0" 
                                    :categories="filteredCategories"
                                    :selectedIds="selectedIds" 
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

export default {
    components: {
        CategoryList,
    },
    name: 'category',
    data() {
        return {
            categories: [],
            selectedIds: [],
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
    beforeUpdate() {
        $('.example1').DataTable().destroy();
    },
    methods: {
        async retrieveCategories() {
            try {
                this.categories = await CategoryService.getAll();
                this.$nextTick(() => {
                    initializeDataTable();
                });
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveCategories();
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
    },
    mounted() {
        this.refreshList();
    },
};
</script>
