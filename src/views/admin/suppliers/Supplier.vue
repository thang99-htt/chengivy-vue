<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Danh sách nhà cung cấp</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <div class="row">
                    <div class="mb-5 col-4">              
                        <div class="d-flex align-items-center">
                            <button class="btn me-4 btn-primary" @click="refreshList()">
                                <i class="fas fa-redo"></i> Làm mới
                            </button>
                            <button class="btn me-3 btn-success" @click="goToAddSupplier">
                                <i class="fas fa-plus"></i> Thêm mới
                            </button>
                            <button
                                class="btn me-3 btn-danger"
                            >
                                <i class="fas fa-trash"></i> Xóa tất cả
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <SupplierList
                        v-if="filteredSuppliersCount > 0"
                        :suppliers="filteredSuppliers"
                    />
                    <p v-else>Không có nhà cung cấp nào.</p>
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
    import SupplierList from "@/components/admin/suppliers/SupplierList.vue";
    import SupplierService from "@/services/admin/supplier.service";

    export default {
        components: {
            SupplierList,
        },
        name: 'supplier',
        data() {
            return {
                suppliers: [],
            };
        },
        computed: {
            filteredSuppliers() {
                return this.suppliers;
            },
            filteredSuppliersCount() {
                return this.filteredSuppliers.length;
            },
        },
        methods: {
            async retrieveSuppliers() {
                try {
                    this.suppliers = await SupplierService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveSuppliers();
            },
            goToAddSupplier() {
                this.$router.push({ name: "supplier.add" });
            },
        },
        mounted() {
            this.refreshList();
        },
    };
</script>
<style scoped>
    
</style>
