<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Danh sách danh mục</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="dataTables_wrapper dt-bootstrap" id="example1_wrapper">
                <div class="row">
                  <div class="col-sm-6">
                    <div id="example1_length" class="dataTables_length">
  
                    </div>
                  </div>
                </div>
  
                <div class="row">
                    <div class="mb-5 col-4 ms-4">              
                        <div class="d-flex align-items-center">
                            <button class="btn btn-primary me-3" @click="refreshList()">
                                <i class="fas fa-redo"></i> Làm mới
                            </button>
                            <button class="btn btn-success me-3" @click="goToAddCategory">
                                <i class="fas fa-plus"></i> Thêm mới
                            </button>
                            <button
                                class="btn btn-danger"
                                @click="removeAllCategories"
                            >
                                <i class="fas fa-trash"></i> Xóa tất cả
                            </button>
                        </div>
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
      </div>
    </section>
 <!-- end dashboard inner -->
</template>
<script>
    import CategoryList from "@/components/back/categories/CategoryList.vue";
    import CategoryService from "@/services/back/category.service";

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
