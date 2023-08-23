<template>
    <section class="content">
        <div class="option-filter">
            <a 
                @click="selectedOption=0"
                :class="{ active: selectedOption==0 }"    
            >   Tất cả
            </a>  
            <a 
                @click="selectedOption=1"
                :class="{ active: selectedOption==1 }"    
            >   Chờ xử lý
            </a> 
            <a 
                @click="selectedOption=6"
                :class="{ active: selectedOption==6 }"   
            >   Đang giao
            </a>
            <a 
                @click="selectedOption=9"
                :class="{ active: selectedOption==9 }"   
            >   Hoàn thành
            </a>
            <a 
                @click="selectedOption=10"
                :class="{ active: selectedOption==10 }"   
            >   Đã hủy
            </a>
            <a 
                @click="selectedOption=11"
                :class="{ active: selectedOption==11 }"   
            >   Bán tại cửa hàng
            </a>
        </div>
        <div class="row center-block">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-body">
                        <div class="group-btn">
                            <div class="d-flex align-items-center justify-content-end mb-3">
                                <input type="button" name="btnBack" value="Làm mới" @click="refreshList()">
                                <input type="button" name="btnAdd" value="Thêm mới" @click="showModal = !showModal">
                                <input type="button" name="btnAdd" value="Thêm từ file">
                                <input type="button" name="btnDelete" value="Xóa" @click="deleteorder()">
                                <input type="button" id="exportPrintBtn" name="btnPrint" value="In">
                                <input type="button" id="exportExcelBtn" name="btnExcel" value="Xuất Excel">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 table-responsive">
                                <OrderList 
                                    v-if="filteredOrders" 
                                    :orders="filteredOrders"
                                    :selectedIds="selectedIds" 
                                />
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
            selectedIds: [],
            selectedOption: 0
        };
    },
    computed: {
        filteredOrders() {
            let filtered = [...this.orders];
            if (this.selectedOption != 0) {
                filtered = filtered.filter(item =>
                    item.status.id == this.selectedOption
                );
            }

            return filtered;
        },
    },
    methods: {
        async retrieveorders() {
            try {
                this.orders = await OrderService.getAll();
                if ($.fn.DataTable.isDataTable('.example1')) {
                    $('.example1').DataTable().destroy();
                }
                this.$nextTick(() => {
                    initializeDataTable();
                });
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveorders();
            this.selectedIds = [];
        },
        deleteorder() {
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
                    OrderService.delete(this.selectedIds).then((res) => {
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
