<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Danh sách hoá đơn</h3>
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
                            <button
                                class="ms-3 btn btn-danger"
                                @click="removeAllInvoices"
                            >
                                <i class="fas fa-trash"></i> Xóa tất cả
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <InvoiceList
                        v-if="filteredInvoicesCount > 0"
                        :invoices="filteredInvoices"
                    />
                    <p v-else>Không có hóa đơn nào.</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
<script>
    import InvoiceList from "@/components/admin/invoices/InvoiceList.vue";
    import InvoiceService from "@/services/admin/invoice.service";

    export default {
        components: {
            InvoiceList,
        },
        name: 'invoice',
        data() {
            return {
                invoices: [],
            };
        },
        computed: {
            filteredInvoices() {
                return this.invoices;
            },
            filteredInvoicesCount() {
                return this.filteredInvoices.length;
            },
        },
        methods: {
            async retrieveInvoices() {
                try {
                    this.invoices = await InvoiceService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveInvoices();
            },
            async removeAllInvoices() {
                if (confirm("Bạn muốn xóa tất cả Vai trò?")) {
                    try {
                        await InvoiceService.deleteAll();
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        mounted() {
            this.refreshList();
        },
    };
</script>
<style scoped>
    
</style>
