<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Danh sách phiếu nhập hàng</h3>
            </div>
            <div class="box-body">
                <div class="row">
                    <div class="mb-5 col-4 ms-4">              
                        <div class="d-flex align-items-center">
                            <button class="btn btn-primary me-3" @click="refreshList()">
                                <i class="fas fa-redo"></i> Làm mới
                            </button>
                            <button class="btn btn-success me-3" @click="goToAddCategory">
                                <i class="fas fa-plus"></i> Thêm mới
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <ImportList
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
    import ImportList from "@/components/admin/coupons/ImportList.vue";
    import CategoryService from "@/services/admin/category.service";

    export default {
        components: {
            ImportList,
        },
        name: 'import-coupon',
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
