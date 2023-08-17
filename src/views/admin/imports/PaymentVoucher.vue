<template>
    <PaymentVoucherModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :paymentID="paymentID"/>
        
    <section class="content">
        <div class="box">
            <div class="box-body">
                <div class="group-btn">
                    <div class="d-flex align-items-center justify-content-end mb-3">
                        <input type="button" name="btnBack" value="Làm mới" @click="refreshList()">
                        <input type="button" name="btnAdd" value="Thêm mới" @click="showModal = !showModal">
                        <input type="button" name="btnAdd" value="Thêm từ file">
                        <input type="button" name="btnDelete" value="Xóa" @click="deletePayment()">
                        <input type="button" id="exportPrintBtn" name="btnPrint" value="In">
                        <input type="button" id="exportExcelBtn" name="btnExcel" value="Xuất Excel">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 table-responsive">
                        <PaymentVoucherList 
                            v-if="filteredPaymentsCount > 0" 
                            :payments="filteredPayments" 
                            :selectedIds="selectedIds" 
                            :showModal="showModal"
                            @update-modal="updateShowModal"
                            :paymentID="paymentID"
                            @update-paymentID="updatePayment"
                        />
                        <p v-else>Không có phiếu chi nào.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import $ from 'jquery'
import { initializeDataTable } from '../../../utils';
import PaymentVoucherList from "@/components/admin/payments/PaymentVoucherList.vue";
import PaymentVoucherModal from "@/components/admin/payments/PaymentVoucherModal.vue";
import PaymentService from "@/services/admin/payment.service";

export default {
    components: {
        PaymentVoucherList,
        PaymentVoucherModal
    },
    name: 'payment-voucher',
    data() {
        return {
            payments: [],
            paymentID: null,
            selectedIds: [],
            showModal: false
        };
    },
    computed: {
        filteredPayments() {
            return this.payments;
        },
        filteredPaymentsCount() {
            return this.filteredPayments.length;
        },
    },
    methods: {
        async retrievePayments() {
            try {
                this.payments = await PaymentService.getAll();
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
            this.retrievePayments();
            this.selectedIds = [];
        },
        deletePayment() {
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
                    PaymentService.delete(this.selectedIds).then((res) => {
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
            this.paymentID = null;
        },
        updateShowModal(value) {
            this.showModal = value;
        },
        updatePayment(value) {
            this.paymentID = value;
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
