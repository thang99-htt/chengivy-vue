<template>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class="example1 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">#</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Danh mục cha</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Tên</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Hình ảnh</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Mô tả</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Đường dẫn</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Trạng thái</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Ngày tạo</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(category, index) in categoriesList"
            :key="category"
        >
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>
                <span v-if="category.parent">
                    {{ category.parent.name }}
                </span>
                <span v-else>
                    NULL
                </span>
            </td>
            <td>{{ category.name }}</td>
            <td>
                <img v-if="category.image" :src="getImage(category.image)"
                 alt="Image" class="img-responsive center-block">
                
            </td>
            <td>{{ category.description }}</td>
            <td>{{ category.url }}</td>
            <td>
                <button
                    :class="[category.status == 1 ? 'btn-show' : 'btn-hide']"
                    @click="statusUpdate(category)"
                >
                {{category.status == 1 ? 'Hiện' : 'Ẩn'}}
                </button>                    
            </td>
            <td>{{ new Date(category.created_at).toLocaleString() }}</td>
            <td>
                <button
                    type="button"
                    class="ms-2 btn btn-primary"
                >
                    <i class="fas fa-eye"></i>
                </button>
                <button
                    type="button"
                    class="ms-2 btn btn-success"
                >
                    <router-link
                          :to="{
                              name: 'category.edit',
                              params: { id: category.id },
                          }" 
                    >
                        <i class="fa fa-pen"></i>
                    </router-link>
                </button>
                <button
                    v-if="category.id"
                    type="button"
                    class="ms-2 btn btn-danger"
                    @click="deleteCategory(category.id)"
                >
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
    import $ from 'jquery'
    import CategoryService from "@/services/admin/category.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    
    export default {
        name: 'CategoryList',
        props: {
            categories: { type: Array, default: [] },
        },
        mounted() {
            this.$nextTick(() => {
                $(".example1").DataTable({
                    "language": {
                        "search": "Tìm kiếm:",
                        "loadingRecords": "Đang tải...",
                        "zeroRecords": "Không tìm thấy kết quả",
                        "lengthMenu": "Hiển thị _MENU_ bản ghi",
                        "info": "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
                        "paginate": {
                            "first": "Trang đầu",
                            "last": "Trang cuối",
                            "next": "Trang sau",
                            "previous": "Trang trước"
                        }
                    }
                })
            })
        },
        data() {
            return {
                categoriesList: this.categories,
                status: 0,
            };
        },
        beforeUpdate() {
            $('.example1').DataTable().destroy();
        },
        methods: {
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/categories/'+image;
            },
            statusUpdate(category) {
                try {
                    console.log(category.status);
                    CategoryService.updateStatus(category.id, category.status)
                    .then( (response) => {
                        this.refreshList();
                        console.log(response.category.status);
                    })                  

                } catch (error) {
                    console.log(error);
                }   
            },
            async retrieveCategories() {
                try {
                    this.categoriesList= await CategoryService.getAll();
                    this.$nextTick(() => {
                        $('.example1').DataTable()
                    })
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveCategories();
            },
            deleteCategory(id) {
                Swal.fire({
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
                        CategoryService.delete(id).then((res) => {
                            if(res.success) {
                                this.refreshList();
                            }
                        })
                        Swal.fire('Đã xóa thành công!','','success')
                    }
                })
            },
        },
        
    };
</script>

<style>
    @import url('/static/js/plugins/datatables/dataTables.bootstrap.css');
    @import url('/static/css/bootstrap.min.css');
</style>
