<template>
    <section class="content">
        <div class="row center-block">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-body">
                        <div class="group-btn">
                            <div class="d-flex align-items-center justify-content-end mb-3">
                                <input type="button" name="btnBack" value="Làm mới" @click="refreshList()">
                                <input type="button" name="btnAdd" value="Thêm mới" @click="goToAddPermission">
                                <input type="button" name="btnAdd" value="Thêm từ file">
                                <input type="button" name="btnDelete" value="Xóa" @click="deletePermission()">
                                <input type="button" id="exportPrintBtn" name="btnPrint" value="In">
                                <input type="button" id="exportExcelBtn" name="btnExcel" value="Xuất Excel">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 table-responsive">
                                <PermissionList 
                                    v-if="filteredPermissionsCount > 0" 
                                    :permissions="filteredPermissions" 
                                    :selectedIds="selectedIds" 
                                />
                                <p v-else>Không có quyền nào.</p>
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
import PermissionList from "@/components/admin/permissions/PermissionList.vue";
import PermissionService from "@/services/admin/permission.service";

export default {
    components: {
        PermissionList,
    },
    name: 'permission',
    data() {
        return {
            permissions: [],
            selectedIds: [],
        };
    },
    computed: {
        filteredPermissions() {
            return this.permissions;
        },
        filteredPermissionsCount() {
            return this.filteredPermissions.length;
        },
    },
    beforeUpdate() {
        $('.example1').DataTable().destroy();
    },
    methods: {
        async retrievePermissions() {
            try {
                this.permissions = await PermissionService.getAll();
                this.$nextTick(() => {
                    initializeDataTable();
                });
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievePermissions();
        },
        goToAddPermission() {
            this.$router.push({ name: "permission.add" });
        },
        deletePermission() {
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
                    PermissionService.delete(this.selectedIds).then((res) => {
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
