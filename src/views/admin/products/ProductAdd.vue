<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div v-if="product" class="box box-info">
                    <div class="box-header with-border">
                        <router-link to="/admin/products">
                            <input type="button" name="btnBack" value="Trở về">
                        </router-link>
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
    import ProductForm from "@/components/admin/products/ProductForm.vue";
    import ProductService from "@/services/admin/product.service";

    export default {
        components: {
            ProductForm,
        },
        data() {
            return {
                product: {
                    'categoy_id': "",
                    'name': "",
                    'description': "",
                    'purchase_price': "",
                    'price': "",
                    'quantity': "",
                    'type_id': "",
                    'discount_percent': 0,
                },
            };
        },
        methods: {
            async createProduct(data) {
                const Toast = this.$swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', this.$swal.stopTimer)
                        toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                    }
                });
                try {
                    await ProductService.create(data);
                    Toast.fire({
                        icon: 'success',
                        title: 'Sản phẩm được thêm thành công.'
                    })
                } catch (error) {
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