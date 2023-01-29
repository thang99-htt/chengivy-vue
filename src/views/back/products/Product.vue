<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Danh sách sản pẩm</h3>
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
                    <div class="mb-5 col-4">              
                        <div class="d-flex align-items-center">
                            <button class="ms-4 btn btn-primary" @click="refreshList()">
                                <i class="fas fa-redo"></i> Làm mới
                            </button>
                            <button class="ms-3 btn btn-success" @click="goToAddProduct">
                                <i class="fas fa-plus"></i> Thêm mới
                            </button>
                            <button
                                class="ms-3 btn btn-danger"
                                @click="removeAllProducts"
                            >
                                <i class="fas fa-trash"></i> Xóa tất cả
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <ProductList
                        v-if="filteredProductsCount > 0"
                        :products="filteredProducts"
                    />
                    <p v-else>Không có liên hệ nào.</p>
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
    import ProductList from "@/components/back/products/ProductList.vue";
    import ProductService from "@/services/back/product.service";

    export default {
        components: {
            ProductList,
        },
        name: 'product',
        data() {
            return {
                products: [],
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
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveProducts();
            },
            async removeAllProducts() {
                if (confirm("Bạn muốn xóa tất cả Vai trò?")) {
                    try {
                        await ProductService.deleteAll();
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            goToAddProduct() {
                this.$router.push({ name: "product.add" });
            },
        },
        mounted() {
            this.refreshList();
        },
    };
</script>
<style scoped>
    
</style>
