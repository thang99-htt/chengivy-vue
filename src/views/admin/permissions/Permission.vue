<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Danh sách quyền</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <div class="row">
                    <div class="mb-5 col-4">              
                        <div class="d-flex align-items-center">
                            <button class="btn me-4 btn-primary" @click="refreshList()">
                                <i class="fas fa-redo"></i> Làm mới
                            </button>
                            <button class="btn me-3 btn-success" @click="goToAddPermission">
                                <i class="fas fa-plus"></i> Thêm mới
                            </button>
                            <button
                                class="btn me-3 btn-danger"
                                @click="removeAllPermissions"
                            >
                                <i class="fas fa-trash"></i> Xóa tất cả
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <PermissionList
                        v-if="filteredPermissionsCount > 0"
                        :permissions="filteredPermissions"
                    />
                    <p v-else>Không có quyền nào.</p>
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
            };
        },
        computed: {
            // Trả về các permission có chứa thông tin cần tìm kiếm.
            filteredPermissions() {
                return this.permissions;
            },
            filteredPermissionsCount() {
                return this.filteredPermissions.length;
            },
        },
        methods: {
            async retrievePermissions() {
                try {
                    this.permissions = await PermissionService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrievePermissions();
            },
            async removeAllPermissions() {
                Swal.fire({
                    title: 'Bạn muốn xóa tất cả Quyền?',
                    text: "Bạn sẽ không thể hoàn tác lại điều này!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy'
                }).then((result) => {
                    if (result.value) {
                        PermissionService.deleteAll().then((res) => {
                            if(res.success) {
                                this.refreshList();
                            }
                        })
                        Swal.fire('Đã xóa thành công!','','success')
                    }
                })
            },
            goToAddPermission() {
                this.$router.push({ name: "permission.add" });
            },
        },
        mounted() {
            this.refreshList();
        },
    };
</script>
<style scoped>
    
</style>
