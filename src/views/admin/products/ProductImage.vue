<template>
    <table
        aria-describedby="example1_info" role="grid" 
        id="" class=" example1 table table-bordered table-striped dataTable"
    >
        <thead>
            <tr role="row">
                <th>#</th>
                <th>Hình ảnh</th>
                <th>Tùy chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row"
                v-for="(image, index) in productLocal.images"
                :key="image"
            >
                <td>
                    {{ index + 1 }}
                </td>
                <td>
                    <img :src="getImage(image.image)"
                    alt="Image" class="img-edit img-responsive">
                </td>
                <td>
                    <button
                        v-if="image.id"
                        type="button"
                        class="ml-2 btn btn-danger"
                        @click="deleteProduct(image.id)"
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
                products: [],
            };
        },
        methods: {
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            
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
                        ProductService.deleteImage(id).then((res) => {
                            if(res.success) {
                                console.log(id)
                            }
                        })
                        Swal.fire('Đã xóa thành công!','','success')
                    }
                })
            },
        },
    };
</script>
<style scoped>
    .img-edit {
        width: 100px;
        display: block;
    }
</style>
