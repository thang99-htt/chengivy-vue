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
                        <input type="button" name="btnDelete" value="Xóa">
                        <input type="button" name="btnPrint" value="In">
                        <input type="button" name="btnExcel" value="Xuất Excel">
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <CategoryList
                        v-if="filteredCategoriesCount > 0"
                        :categories="filteredCategories"
                    />
                    <p v-else>Không có danh mục nào.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
 <!-- end dashboard inner -->
</template>
<script>
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
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveCategories();
            },
            async removeAllCategories() {
                if (confirm("Bạn muốn xóa tất cả Vai trò?")) {
                    try {
                        await CategoryService.deleteAll();
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            goToAddCategory() {
                this.$router.push({ name: "category.add" });
            },
        },
        mounted() {
            this.refreshList();
        },
    };
</script>
