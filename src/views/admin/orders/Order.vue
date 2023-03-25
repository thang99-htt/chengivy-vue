<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Danh sách đơn hàng</h3>
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
                                @click="removeAllOrders"
                            >
                                <i class="fas fa-trash"></i> Xóa tất cả
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <OrderList
                        v-if="filteredOrdersCount > 0"
                        :orders="filteredOrders"
                    />
                    <p v-else>Không có đơn hàng nào.</p>
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
    import OrderList from "@/components/admin/orders/OrderList.vue";
    import OrderService from "@/services/admin/order.service";

    export default {
        components: {
            OrderList,
        },
        name: 'order',
        data() {
            return {
                orders: [],
            };
        },
        computed: {
            filteredOrders() {
                return this.orders;
            },
            filteredOrdersCount() {
                return this.filteredOrders.length;
            },
        },
        methods: {
            async retrieveOrders() {
                try {
                    this.orders = await OrderService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveOrders();
            },
            async removeAllOrders() {
                if (confirm("Bạn muốn xóa tất cả Vai trò?")) {
                    try {
                        await OrderService.deleteAll();
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
