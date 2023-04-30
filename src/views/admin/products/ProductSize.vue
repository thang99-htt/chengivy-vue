<template>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class=" example1 table table-bordered table-striped dataTable"
    >
        <thead>
            <tr role="row">
                <th>#</th>
                <th>Size</th>
                <th>Số lượng</th>
                <th>Tồn kho</th>
                <th>Tùy chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row"
                v-for="(size, index) in productLocal.sizes"
                    :key="size" 
                    :value="size.id"
            >
                <td>
                    {{ index + 1 }}
                </td>
                <td>
                    {{ size.size_name }}
                </td>
                <td>
                    {{ size.quantity }}
                </td>
                <td>
                    {{ size.stock }}
                </td>
                <td>
                    <button
                        v-if="size.id"
                        type="button"
                        class="ml-2 btn btn-danger"
                        @click="deleteProduct(size.id)"
                    >
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>

    import ProductService from "@/services/admin/product.service";
    export default {        
        props: {
            product: { type: Object, required: true },
        },
        
        data() {
            return {
                productLocal: this.product,
            };
        },
        methods: {            
            async deleteProduct(id) {
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
                        ProductService.deleteSize(id).then((res) => {
                            if(res.success) {
                                console.log(id);
                            }
                        })
                        Swal.fire('Đã xóa thành công!','','success')
                    }
                })
            },
        },
    };
</script>
