<template>
    <table id="" class="example1 table table-bordered table-striped dataTable">
      <thead>
        <tr role="row">
            <th width="4%">#</th>
            <th width="10%">Danh mục cha</th>
            <th width="14%">Tên</th>
            <th width="10%">Hình ảnh</th>
            <th width="14%">Mô tả</th>
            <th width="6%">Đường dẫn</th>
            <th width="8%">Trạng thái</th>
            <th width="8%">Ngày tạo</th>
            <th width="7%">Tùy chọn</th>
            <th width="5%">Chọn</th>
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
                <img v-if="category.image" :src="getImageCat(category.image)"
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
                    class="btn"
                >
                    <router-link
                          :to="{
                              name: 'category.edit',
                              params: { id: category.id },
                          }" 
                    >
                        <img src="/images/icon/iconedit.png" alt="">
                    </router-link>
                </button>
                <button
                    v-if="category.id"
                    type="button"
                    class="btn"
                    @click="deleteCategory(category.id)"
                >
                    <i class="fas fa-trash color-delete"></i>
                </button>
            </td>
            <td>
                <input type="checkbox">
            </td>
        </tr>
        <tr role="row">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>a</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
    import $ from 'jquery'
    import CategoryService from "@/services/admin/category.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    import { getImageCat, initializeDataTable } from '../../../utils';
    export default {
        name: 'CategoryList',
        props: {
            categories: { type: Array, default: [] },
        },
        mounted() {
            this.$nextTick(() => {
                initializeDataTable();
            });
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
            getImageCat,
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
                        CategoryService.delete(id).then((res) => {
                            if(res.success) {
                                this.refreshList();
                            }
                        })
                        this.$swal.fire('Đã xóa thành công!','','success')
                    }
                })
            },
        },
        
    };
</script>

<style>
    @import url('/static/js/plugins/datatables/dataTables.bootstrap.css');
    @import url('/static/css/bootstrap.min.css');
    .color-edit {
        color: #4c86bc;
    }
    .color-delete {
        color: #c31211;
    }
</style>
