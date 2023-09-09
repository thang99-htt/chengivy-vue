<template>
    <VoucherModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :voucherID="voucherID"/>

    <section class="content">
        <div class="row center-block">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-body">
                        <div class="group-btn">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <div>
                                    <button type="button" class="btnAdd" @click="showModal = !showModal">
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
                                    <button type="button" class="btnDelete" @click="deleteVoucher()">
                                        <i class="fa fa-trash"></i>Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 table-responsive">
                                <VoucherList 
                                    v-if="filteredVouchersCount > 0" 
                                    :vouchers="filteredVouchers"
                                    :selectedIds="selectedIds" 
                                    :showModal="showModal"
                                    @update-modal="updateShowModal"
                                    :voucherID="voucherID"
                                    @update-voucherID="updatevoucher"
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
import VoucherList from "@/components/admin/vouchers/VoucherList.vue";
import VoucherService from "@/services/admin/voucher.service";
import VoucherModal from "@/components/admin/vouchers/VoucherModal.vue";

export default {
    components: {
        VoucherList,
        VoucherModal
    },
    name: 'voucher',
    data() {
        return {
            vouchers: [],
            selectedIds: [],
            voucherID: null,
            showModal: false
        };
    },
    computed: {
        filteredVouchers() {
            return this.vouchers;
        },
        filteredVouchersCount() {
            return this.filteredVouchers.length;
        },
    },
    methods: {
        async retrieveVouchers() {
            try {
                this.vouchers = await VoucherService.getAll();
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
            this.retrieveVouchers();
            this.selectedIds = [];
        },
        deleteVoucher() {
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
                    VoucherService.delete(this.selectedIds).then((res) => {
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
            this.voucherID = null;
        },
        updateShowModal(value) {
            this.showModal = value;
        },
        updatevoucher(value) {
            this.voucherID = value;
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
