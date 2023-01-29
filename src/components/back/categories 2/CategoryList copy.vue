<script>
    import $ from 'jquery'
    import CategoryService from "@/services/category.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    import { ref } from 'vue'
    
    export default {
        name: 'CategoryList',
        components: {
            
        },
        props: {
            categories: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        mounted() {
            CategoryService.getAll().then((response) => {
                this.categories = response;
                this.$nextTick(() => {
                    $('.example1').DataTable()
                })
            });
        },
        data() {
            return {
                categories: [],
                status: 0,
            };
        },
        beforeUpdate() {
            $('.example1').DataTable().destroy();
        },
        methods: {
            getImage(image){
                return 'http://127.0.0.1:8000/uploads/categories/'+image;
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
                    this.categories= await CategoryService.getAll();
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
            deleteAll(id){
                alert(id)
            }
        },
        setup () {
            return {
                selection: ref([ 1, 2 ])
            }
        }
        
    };
</script>
<template>
    <div class="q-px-sm">
      The model data: <strong>{{ selection }}</strong>
    </div>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class=" example1 table table-bordered table-striped dataTable"
    >
      <thead>
        <tr role="row">
            <th aria-label="Rendering engine: activate to sort column descending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0">
                <input
                    v-model="selection"
                    type="checkbox"
                    class="form-check-input"
                />
            </th>
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
            v-for="(category, index) in categories"
            :key="category"
        >
            <td>
                <input
                    :value="category.id" 
                    label="category.name" 
                    v-model="selection"
                    type="checkbox"
                    class="form-check-input"
                />
            </td>
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
                    class="btn-sm"
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
                    class="ml-2 btn btn-primary"
                >
                    <i class="fas fa-eye"></i>
                </button>
                <button
                    type="button"
                    class="ml-2 btn btn-success"
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
                    class="ml-2 btn btn-danger"
                    @click="deleteCategory(category.id)"
                >
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
      </tbody>
    </table>
</template>

<style>
    
    @import url('/static/js/plugins/datatables/dataTables.bootstrap.css');
    @import url('/static/css/bootstrap.min.css');

    table.dataTable thead .sorting:after,
    table.dataTable thead .sorting_asc:after,
    table.dataTable thead .sorting_desc:after {
        font-family: 'FontAwesome';
    }
    
    table.dataTable thead .sorting:after {
        content: '\f0dc';
    }
    
    table.dataTable thead .sorting_asc:after {
        content: '\f0dd';
    }
    
    table.dataTable thead .sorting_desc:after {
        content: '\f0de';
    }
</style>
