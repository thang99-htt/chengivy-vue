<template>
    <RoleModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :roleID="roleID"/>
    <section class="content">
        <div class="box">
            <div class="box-body">
                <div class="group-btn">
                    <div class="d-flex align-items-center justify-content-end mb-3">
                        <input type="button" name="btnBack" value="Làm mới" @click="refreshList()">
                        <input type="button" name="btnAdd" value="Thêm mới" @click="showModal = !showModal">
                        <input type="button" name="btnAdd" value="Thêm từ file">
                        <input type="button" name="btnDelete" value="Xóa" @click="deleteRole()">
                        <input type="button" id="exportPrintBtn" name="btnPrint" value="In">
                        <input type="button" id="exportExcelBtn" name="btnExcel" value="Xuất Excel">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 table-responsive">
                        <RoleList 
                            v-if="filteredRolesCount > 0" 
                            :roles="filteredRoles" 
                            :selectedIds="selectedIds" 
                            :showModal="showModal"
                            @update-modal="updateShowModal"
                            :roleID="roleID"
                            @update-roleID="updateRole"
                        />
                        <p v-else>Không có vai trò nào.</p>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>
<script>
import $ from 'jquery';
import { initializeDataTable } from '../../../utils';
import RoleList from "@/components/admin/roles/RoleList.vue";
import RoleService from "@/services/admin/role.service";
import RoleModal from "@/components/admin/roles/RoleModal.vue";

export default {
    components: {
        RoleList,
        RoleModal
    },
    name: 'role',
    data() {
        return {
            roles: [],
            roleID: null,
            selectedIds: [],
            showModal: false
        };
    },
    computed: {
        filteredRoles() {
            return this.roles;
        },
        filteredRolesCount() {
            return this.filteredRoles.length;
        },
    },
    methods: {
        async retrieveRoles() {
            try {
                this.roles = await RoleService.getAll();
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
            this.retrieveRoles();
            this.selectedIds = [];
        },
        deleteRole() {
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
                    RoleService.delete(this.selectedIds).then((res) => {
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
            this.roleID = null;
        },
        updateShowModal(value) {
            this.showModal = value;
        },
        updateRole(value) {
            this.roleID = value;
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped></style>
