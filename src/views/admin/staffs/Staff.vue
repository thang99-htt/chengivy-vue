<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Danh sách nhân viên</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <div class="row">
                    <div class="mb-5 col-4 px-5">              
                        <div class="d-flex align-items-center">
                            <button class="btn me-4 btn-primary" @click="refreshList()">
                                <i class="fas fa-redo"></i> Làm mới
                            </button>
                            <button class="btn me-3 btn-success" @click="goToAddStaff">
                                <i class="fas fa-plus"></i> Thêm mới
                            </button>
                            <button
                                class="btn me-3 btn-danger"
                                @click="removeAllStaffs"
                            >
                                <i class="fas fa-trash"></i> Xóa tất cả
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <StaffList
                        v-if="filteredStaffsCount > 0"
                        :staffs="filteredStaffs"
                    />
                    <p v-else>Không có nhân nào.</p>
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
    import StaffList from "@/components/admin/staffs/StaffList.vue";
    import StaffService from "@/services/admin/staff.service";

    export default {
        components: {
            StaffList,
        },
        name: 'staff',
        data() {
            return {
                staffs: [],
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
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveStaffs();
            },
            async removeAllStaffs() {
                this.$swal.fire({
                    title: 'Bạn muốn xóa tất cả Nhân viên?',
                    text: "Bạn sẽ không thể hoàn tác lại điều này!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy'
                }).then((result) => {
                    if (result.value) {
                        StaffService.deleteAll().then((res) => {
                            if(res.success) {
                                this.refreshList();
                            }
                        })
                        this.$swal.fire('Đã xóa thành công!','','success')
                    }
                })
            },
            goToAddStaff() {
                this.$router.push({ name: "staff.add" });
            },
        },
        mounted() {
            this.refreshList();
        },
    };
</script>
<style scoped>
    
</style>
