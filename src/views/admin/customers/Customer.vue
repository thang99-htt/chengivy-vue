<template>
    <CustomerModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :customerID="customerID"/>
    <section class="content">
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
                            <button type="button" class="btnDelete">
                                <i class="fa fa-trash"></i>Xóa
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 table-responsive">
                        <CustomerList 
                            v-if="filteredCustomersCount > 0" 
                            :customers="filteredCustomers" 
                            :selectedIds="selectedIds" 
                            :showModal="showModal"
                            @update-modal="updateShowModal"
                            :customerID="customerID"
                            @update-customerID="updateCustomer"
                        />
                        <p v-else>Không có khách hàng nào.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import $ from 'jquery'
import { initializeDataTable } from '../../../utils';
import CustomerList from "@/components/admin/customers/CustomerList.vue";
import CustomerModal from "@/components/admin/customers/CustomerModal.vue";
import CustomerService from "@/services/admin/customer.service";

export default {
    components: {
        CustomerList,
        CustomerModal
    },
    name: 'customer',
    data() {
        return {
            customers: [],
            customerID: null,
            selectedIds: [],
            showModal: false
        };
    },
    computed: {
        filteredCustomers() {
            return this.customers;
        },
        filteredCustomersCount() {
            return this.filteredCustomers.length;
        },
    },
    methods: {
        async retrieveCustomers() {
            try {
                this.customers = await CustomerService.getAll();
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
            this.retrieveCustomers();
            this.selectedIds = [];
        },
        deleteCustomer() {
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
                    CustomerService.delete(this.selectedIds).then((res) => {
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
            this.customerID = null;
        },
        updateShowModal(value) {
            this.showModal = value;
        },
        updateCustomer(value) {
            this.customerID = value;
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
