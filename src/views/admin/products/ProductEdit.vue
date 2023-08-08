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
                            @submit:product="updateProduct"
                            @delete:product="deleteProduct"
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
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                product: null,
            };
        },
        methods: {
            async getProduct(id) {
                try {
                    this.product = await ProductService.get(id);
                } catch (error) {
                    console.log(error);
                    // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                    this.$router.push({
                        name: "notfound",
                        params: {
                            pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },
            async updateProduct(data) {
                try {
                    await ProductService.update(this.product.id, data);
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
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Sản phẩm được cập nhật thành công.'
                    })
                    
                    this.$router.push({ name: "product" });
                } catch (error) {
                    console.log(error);
                }
            },
            async deleteProduct() {
                if (confirm("Bạn muốn xóa Sản phẩm này?")) {
                    try {
                        await ProductService.delete(this.product.id);
                        this.$router.push({ name: "product" });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        created() {
            this.getProduct(this.id);
        },
    };
</script>
