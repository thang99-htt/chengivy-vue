<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Danh sách phiếu chi</h3>
            </div>
            <div class="box-body">
                <div class="row">
                    <div class="mb-5 col-4">              
                        <div class="d-flex align-items-center">
                            <button class="btn me-4 btn-primary" @click="refreshList()">
                                <i class="fas fa-redo"></i> Làm mới
                            </button>
                            <button class="btn me-3 btn-success" @click="goToAddPaymentVoucher">
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
                    <PaymentVoucherList
                        v-if="filteredPyamentVouchersCount > 0"
                        :payment_vouchers="filteredPyamentVouchers"
                    />
                    <p v-else>Không có phiếu chi nào.</p>
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
    import PaymentVoucherList from "@/components/admin/payment-vouchers/PaymentVoucherList.vue";
    import PaymentVoucherService from "@/services/admin/payment-voucher.service";

    export default {
        components: {
            PaymentVoucherList,
        },
        name: 'supplier',
        data() {
            return {
                payment_vouchers: [],
            };
        },
        computed: {
            filteredPyamentVouchers() {
                return this.payment_vouchers;
            },
            filteredPyamentVouchersCount() {
                return this.filteredPyamentVouchers.length;
            },
        },
        methods: {
            async retrievePaymentVouchers() {
                try {
                    this.payment_vouchers = await PaymentVoucherService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrievePaymentVouchers();
            },
            goToAddPaymentVoucher() {
                this.$router.push({ name: "payment-voucher.add" });
            },
        },
        mounted() {
            this.refreshList();
        },
    };
</script>
<style scoped>
    
</style>
