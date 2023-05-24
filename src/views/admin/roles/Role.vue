<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Danh sách vai trò</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <div class="row">
                    <div class="mb-5 col-4">              
                        <div class="d-flex align-items-center">
                            <button class="btn me-4 btn-primary" @click="refreshList()">
                                <i class="fas fa-redo"></i> Làm mới
                            </button>
                            <button class="btn me-3 btn-success" @click="goToAddRole">
                                <i class="fas fa-plus"></i> Thêm mới
                            </button>
                            <button
                                class="btn me-3 btn-danger"
                                @click="removeAllRoles"
                            >
                                <i class="fas fa-trash"></i> Xóa tất cả
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <RoleList
                        v-if="filteredRolesCount > 0"
                        :roles="filteredRoles"
                    />
                    <p v-else>Không có vai trò nào.</p>
                    </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
 <!-- end dashboard inner -->
</template>
<script>
    import RoleList from "@/components/admin/roles/RoleList.vue";
    import RoleService from "@/services/admin/role.service";

    export default {
        components: {
            RoleList,
        },
        name: 'role',
        data() {
            return {
                roles: [],
            };
        },
        computed: {
            // Trả về các role có chứa thông tin cần tìm kiếm.
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
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveRoles();
            },
            async removeAllRoles() {
                this.$swal.fire({
                    title: 'Bạn muốn xóa tất cả Vai trò?',
                    text: "Bạn sẽ không thể hoàn tác lại điều này!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy'
                }).then((result) => {
                    if (result.value) {
                        RoleService.deleteAll().then((res) => {
                            if(res.success) {
                                this.refreshList();
                            }
                        })
                        this.$swal.fire('Đã xóa thành công!','','success')
                    }
                })
            },
            goToAddRole() {
                this.$router.push({ name: "role.add" });
            },
        },
        mounted() {
            this.refreshList();
        },
    };
</script>
<style scoped>
    
</style>
