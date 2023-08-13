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
                            <button class="btn btn-success me-3" @click="goToAddImportCoupon">
                                <i class="fas fa-plus"></i> Thêm mới
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <ImportList
                        v-if="filteredImportCouponsCount > 0"
                        :import_coupons="filteredImportCoupons"
                    />
                    <p v-else>Không có phiếu nhập nào.</p>
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
    import ImportCouponService from "@/services/admin/import-coupon.service";

    export default {
        components: {
            ImportList,
        },
        name: 'import-coupon',
        data() {
            return {
                import_coupons: [],
            };
        },
        computed: {
            filteredImportCoupons() {
                return this.import_coupons;
            },
            filteredImportCouponsCount() {
                return this.filteredImportCoupons.length;
            },
        },
        methods: {
            async retrieveImportCoupons() {
                try {
                    this.import_coupons = await ImportCouponService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveImportCoupons();
            },
            goToAddImportCoupon() {
                this.$router.push({ name: "import-coupon.add" });
            },
        },
        mounted() {
            this.refreshList();
        },
    };
</script>
