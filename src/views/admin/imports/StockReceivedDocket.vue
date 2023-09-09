<template>
    <section class="content">
        <div class="box">
            <div class="box-body">
                <div class="group-btn">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <div>
                            <button type="button" class="btnAdd" @click="goToAddStockReceivedDocket">
                                <i class="fa fa-plus"></i>Thêm mới
                            </button>
                            <button type="button" class="btnPrint">
                                <i class="fa fa-print"></i>In
                            </button>
                            <button type="button" class="btnAddFile">
                                <i class="fa fa-download"></i>Thêm dữ liệu
                            </button>
                            <button type="button" class="btnExcel">
                                <i class="fa fa-upload"></i>Xuất dữ liệu
                            </button>
                        </div>
                        <div>
                            <button type="button" class="btnBack" @click="refreshList()">
                                <i class="fa fa-refresh"></i>Làm mới
                            </button>
                            <button type="button" class="btnDelete">
                                <i class="fa fa-trash"></i>Xóa
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 table-responsive">
                        <StockReceivedDocketList 
                            v-if="filteredStockReceivedDocketsCount > 0" 
                            :stockReceivedDockets="filteredStockReceivedDockets" 
                            :selectedIds="selectedIds" 
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import $ from 'jquery'
import { initializeDataTable } from '../../../utils';
import StockReceivedDocketList from "@/components/admin/imports/StockReceivedDocketList.vue";
import StockReceivedDocketService from "@/services/admin/stock-received-docket.service";

export default {
    components: {
        StockReceivedDocketList,
    },
    name: 'stock-received-docket',
    data() {
        return {
            stockReceivedDockets: [],
            selectedIds: [],
        };
    },
    computed: {
        filteredStockReceivedDockets() {
            return this.stockReceivedDockets;
        },
        filteredStockReceivedDocketsCount() {
            return this.filteredStockReceivedDockets.length;
        },
    },
    methods: {
        async retrieveStockReceivedDockets() {
            try {
                this.stockReceivedDockets = await StockReceivedDocketService.getAll();
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
            this.retrieveStockReceivedDockets();
            this.selectedIds = [];
        },
        deleteStockReceivedDocket() {
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
                    StockReceivedDocketService.delete(this.selectedIds).then((res) => {
                        if (res.success) {
                            this.refreshList();
                        }
                    })
                    this.$swal.fire('Đã xóa thành công!', '', 'success')
                }
            })
        },
        goToAddStockReceivedDocket() {
            this.$router.push({ name: "stock-received-docket.add" });
        }
    },
    mounted() {
        this.refreshList();
    },
};
</script>
