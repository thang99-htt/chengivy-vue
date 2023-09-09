<template>
    <StaffModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :staffID="staffID"/>
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
                        <StaffList 
                            v-if="filteredStaffsCount > 0" 
                            :staffs="filteredStaffs" 
                            :selectedIds="selectedIds" 
                            :showModal="showModal"
                            @update-modal="updateShowModal"
                            :staffID="staffID"
                            @update-staffID="updateStaff"
                        />
                        <p v-else>Không có nhân viên nào.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import $ from 'jquery'
import { initializeDataTable } from '../../../utils';
import StaffList from "@/components/admin/staffs/StaffList.vue";
import StaffModal from "@/components/admin/staffs/StaffModal.vue";
import StaffService from "@/services/admin/staff.service";

export default {
    components: {
        StaffList,
        StaffModal
    },
    name: 'staff',
    data() {
        return {
            staffs: [],
            staffID: null,
            selectedIds: [],
            showModal: false
        };
    },
    computed: {
        filteredStaffs() {
            return this.staffs;
        },
        filteredStaffsCount() {
            return this.filteredStaffs.length;
        },
    },
    methods: {
        async retrieveStaffs() {
            try {
                this.staffs = await StaffService.getAll();
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
            this.retrieveStaffs();
            this.selectedIds = [];
        },
        deleteStaff() {
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
                    StaffService.delete(this.selectedIds).then((res) => {
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
            this.staffID = null;
        },
        updateShowModal(value) {
            this.showModal = value;
        },
        updateStaff(value) {
            this.staffID = value;
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
