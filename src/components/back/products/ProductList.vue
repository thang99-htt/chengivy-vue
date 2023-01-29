<script>
    import $ from 'jquery'
    import ProductService from "@/services/back/product.service";
    import 'datatables.net'
    import 'datatables.net-bs'
    import { ref } from 'vue'
    
    export default {
        name: 'ProductList',
        props: {
            products: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        mounted() {
            ProductService.getAll().then((response) => {
                this.products = response;
                this.$nextTick(() => {
                    $('.example1').DataTable()
                })
            });
        },
        data() {
            return {
                products: [],
                status: 0,
            };
        },
        beforeUpdate() {
            $('.example1').DataTable().destroy();
        },
        methods: {
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            statusUpdate(product) {
                try {
                    console.log(product.status);
                    ProductService.updateStatus(product.id, product.status)
                    .then( (response) => {
                        this.refreshList();
                        console.log(response.product.status);
                    })                  

                } catch (error) {
                    console.log(error);
                }   
            },
            async retrieveProducts() {
                try {
                    this.products = await ProductService.getAll();
                    this.$nextTick(() => {
                        $('.example1').DataTable()
                    })
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveProducts();
            },
            deleteProduct(id) {
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
                        ProductService.delete(id).then((res) => {
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
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Danh mục</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Tên</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Mô tả</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Giá mua (VNĐ)</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Giá bán (VNĐ)</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Hình ảnh</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Thể loại</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Phần trăm giảm giá (%)</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Trạng thái</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Ngày tạo</th>
            <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr role="row"
            v-for="(product, index) in products"
            :key="product"
        >
            <td>
                <input
                    :value="product.id" 
                    label="product.name" 
                    v-model="selection"
                    type="checkbox"
                    class="form-check-input"
                />
            </td>
            <td class="sorting_1" >
                {{ index + 1 }}
            </td>
            <td>{{  product.category.name  }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.description.substring(0,50) }}......</td>
            <td>{{ product.purchase_price }}</td>
            <td>{{ product.price }}</td>
            <td>
                <img v-if="product.image" :src="getImage(product.image)"
                 alt="Image" class="img-responsive center-block">
            </td>
            <td>{{ product.type.name }}</td>
            <td>{{ product.discount_percent }}</td>
            <td>
                <button
                    class="btn-sm"
                    :class="[product.status == 1 ? 'btn-show' : 'btn-hide']"
                    @click="statusUpdate(product)"
                >
                {{product.status == 1 ? 'Hiện' : 'Ẩn'}}
                </button>                    
            </td>
            <td>{{ new Date(product.created_at).toLocaleString() }}</td>
            <td>
                <button
                    type="button"
                    class="me-2 btn btn-primary"
                >
                    <router-link
                          :to="{
                              name: 'product.view',
                              params: { id: product.id },
                          }" 
                    >
                        <i class="fa fa-eye"></i>
                    </router-link>
                </button>
                <button
                    type="button"
                    class="me-2 btn btn-success"
                >
                    <router-link
                          :to="{
                              name: 'product.edit',
                              params: { id: product.id },
                          }" 
                    >
                        <i class="fa fa-pen"></i>
                    </router-link>
                </button>
                <button
                    v-if="product.id"
                    type="button"
                    class="me-2 btn btn-danger"
                    @click="deleteProduct(product.id)"
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

    select.input-sm {
        line-height: unset;
    }
</style>
