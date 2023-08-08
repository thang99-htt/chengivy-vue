<template>
    <section class="content">
        <div class="row center-block">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-body">
                        <div class="group-btn">
                            <div class="d-flex align-items-center justify-content-end mb-3">
                                <input type="button" name="btnBack" value="Làm mới" @click="refreshList()">
                                <input type="button" name="btnAdd" value="Thêm mới" @click="goToAddSupplier">
                                <input type="button" name="btnAdd" value="Thêm từ file">
                                <input type="button" name="btnDelete" value="Xóa" @click="deleteSupplier()">
                                <input type="button" id="exportPrintBtn" name="btnPrint" value="In">
                                <input type="button" id="exportExcelBtn" name="btnExcel" value="Xuất Excel">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 table-responsive">
                                <SupplierList v-if="filteredSuppliersCount > 0" :suppliers="filteredSuppliers" :selectedIds="selectedIds" />
                                <p v-else>Không có nhà cung cấp nào.</p>
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
import SupplierList from "@/components/admin/suppliers/SupplierList.vue";
import SupplierService from "@/services/admin/supplier.service";

export default {
    components: {
        SupplierList,
    },
    name: 'supplier',
    data() {
        return {
            suppliers: [],
            selectedIds: [],
        };
    },
    computed: {
        filteredSuppliers() {
            return this.suppliers;
        },
        filteredSuppliersCount() {
            return this.filteredSuppliers.length;
        },
    },
    beforeUpdate() {
        $('.example1').DataTable().destroy();
    },
    methods: {
        async retrieveSuppliers() {
            try {
                this.suppliers = await SupplierService.getAll();
                this.$nextTick(() => {
                    initializeDataTable();
                });
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveSuppliers();
        },
        goToAddSupplier() {
            this.$router.push({ name: "supplier.add" });
        },
        deleteSupplier() {
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
                    SupplierService.delete(this.selectedIds).then((res) => {
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
<style scoped></style>
