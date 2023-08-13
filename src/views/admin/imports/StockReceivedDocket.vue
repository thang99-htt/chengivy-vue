<template>
    <!-- <StockReceivedDocketModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :stockReceivedDocketID="stockReceivedDocketID"/> -->
    <section class="content">
        <div class="box">
            <div class="box-body">
                <div class="group-btn">
                    <div class="d-flex align-items-center justify-content-end mb-3">
                        <input type="button" name="btnBack" value="Làm mới" @click="refreshList()">
                        <input type="button" name="btnAdd" value="Thêm mới" @click="showModal = !showModal">
                        <input type="button" name="btnAdd" value="Thêm từ file">
                        <input type="button" name="btnDelete" value="Xóa" @click="deleteStockReceivedDocket()">
                        <input type="button" id="exportPrintBtn" name="btnPrint" value="In">
                        <input type="button" id="exportExcelBtn" name="btnExcel" value="Xuất Excel">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 table-responsive">
                        <StockReceivedDocketList 
                            v-if="filteredStockReceivedDocketsCount > 0" 
                            :stockReceivedDockets="filteredStockReceivedDockets" 
                            :selectedIds="selectedIds" 
                            :showModal="showModal"
                            @update-modal="updateShowModal"
                            :stockReceivedDocketID="stockReceivedDocketID"
                            @update-stockReceivedDocketID="updateStockReceivedDocket"
                        />
                        <p v-else>Không có phiếu nhập nào.</p>
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
// import StockReceivedDocketModal from "@/components/admin/imports/StockReceivedDocketModal.vue";
import StockReceivedDocketService from "@/services/admin/stock-received-docket.service";

export default {
    components: {
        StockReceivedDocketList,
        // StockReceivedDocketModal
    },
    name: 'stockReceivedDocket',
    data() {
        return {
            stockReceivedDockets: [],
            stockReceivedDocketID: null,
            selectedIds: [],
            showModal: false
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
        closeModal() {
            this.showModal = false;
            this.stockReceivedDocketID = null;
        },
        updateShowModal(value) {
            this.showModal = value;
        },
        updateStockReceivedDocket(value) {
            this.stockReceivedDocketID = value;
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
