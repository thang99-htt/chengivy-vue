<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="product" class="box box-info">
                    <div class="box-header with-border">
                        <router-link to="/admin/products">
                            <button
                                type="button"
                                class="btn btn-dark me-4"
                            >
                                <i class="fa fa-arrow-left"></i>
                            </button>
                        </router-link>
                        <h3 class="box-title">Thêm mới Danh mục</h3>
                    </div>
                    
                    <div class="box-body offset-3 col-6">
                        <ProductForm
                        :product="product"
                        @submit:product="createProduct"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import ProductForm from "@/components/back/products/ProductForm.vue";
    import ProductService from "@/services/back/product.service";
    export default {
        components: {
            ProductForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                product: null,
            };
        },
        methods: {
            async createProduct(data) {
                try {
                    await ProductService.create(data);
                    
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Sản phẩm được thêm thành công.'
                    })
                } catch (error) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'warning',
                        title: "Định dạnh tệp không được hỗ trợ"
                    })
                    console.log(error.response.data.message);
                }
            },
        },
    };
</script>
