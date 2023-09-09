<template>
    <RoleModal v-if="showModal" :showModal="showModal" 
        @closeModal="closeModal" :roleID="roleID"/>
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
                            <button type="button" class="btnDelete" @click="deleteRole()">
                                <i class="fa fa-trash"></i>Xóa
                            </button>
                        </div>
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
