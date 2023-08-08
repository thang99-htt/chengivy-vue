<template>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class=" example1 table table-bordered table-striped dataTable"
    >
        <thead>
            <tr role="row">
                <th>#</th>
                <th>Kích cỡ</th>
                <th>Màu sắc</th>
                <th>Số lượng đầu</th>
                <th>Số lượng nhập</th>
                <th>Số lượng xuất</th>
                <th>Số lượng cuối</th>
                <th>Tùy chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row"
                v-for="(inventory, index) in productLocal.inventories"
                    :key="inventory" 
                    :value="inventory.id"
            >
                <td>
                    {{ inventory.month_year }}
                </td>
                <td>
                    {{ inventory.size_name }}
                </td>
                <td>
                    {{ inventory.color_name }}
                </td>
                <td>
                    {{ inventory.total_initial }}
                </td>
                <td>
                    {{ inventory.total_import }}
                </td>
                <td>
                    {{ inventory.total_export }}
                </td>
                <td>
                    {{ inventory.total_final }}
                </td>
                <td>
                    <button
                        type="button"
                        class="ml-2 btn btn-danger"
                        @click="deleteProduct(inventory.id)"
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
                        ProductService.deleteSize(id).then((res) => {
                            if(res.success) {
                                console.log(id);
                            }
                        })
                        this.$swal.fire('Đã xóa thành công!','','success')
                    }
                })
            },
        },
    };
</script>
