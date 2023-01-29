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
                <th>Tùy chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row"
                v-for="(size, index) in productLocal.sizes"
                    :key="size" 
                    :value="size.pivot.id"
            >
                <td>
                    {{ index + 1 }}
                </td>
                <td>
                    {{ size.name }}
                </td>
                <td>
                    {{ size.pivot.quantity }}
                </td>
                <td>
                    <button
                        v-if="size.pivot.id"
                        type="button"
                        class="ml-2 btn btn-danger"
                        @click="deleteProduct(size.pivot.id)"
                    >
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>

    import ProductService from "@/services/back/product.service";
    export default {        
        props: {
            product: { type: Object, required: true },
        },
        
        data() {
            return {
                productLocal: this.product.product,
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
