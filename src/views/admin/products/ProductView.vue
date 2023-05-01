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
                        <h3 class="box-title">Chi Tiết Sản phẩm</h3>
                    </div>
                    
                    <div class="box-body">
                        <div class="form-group">
                            <p>Danh mục: {{ product.category }}</p>
                            <p>Tên sản phẩm: {{ product.name }}</p>
                            <p>Giá bán: {{ product.price }} VNĐ</p>
                            <p>Thể loại: {{ product.type }}</p>
                        </div>
                        <div class="row">
                            <div class="col-6 mt-3">
                                <ProductFormImage
                                :product="product"
                                @submit:product="createProductImage"
                                @delete:product="deleteImage"
                                />
                            </div>
                            <div class="col-6 mt-3">
                                <ProductFormSize
                                :product="product"
                                @submit:product="createProductSize"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <ProductImage
                                    :product="product"
                                    @delete:product="deleteProduct"
                                />
                            </div>
                            <div class="col-6">
                                <ProductSize
                                    :product="product"
                                    @delete:product="deleteProduct"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import ProductFormImage from "@/components/admin/products/ProductFormImage.vue";
    import ProductFormSize from "@/components/admin/products/ProductFormSize.vue";
    import ProductImage from "./ProductImage.vue";
    import ProductSize from "./ProductSize.vue";
    import ProductService from "@/services/admin/product.service";
    export default {
        components: {
        ProductFormImage,
        ProductFormSize,
        ProductImage,
        ProductSize,
},
        props: {
            id: { type: String, required: true },
            product: { type: Object, required: true },
        },
        data() {
            return {
                product: this.product,
            };
        },
        methods: {
            async getProduct(id) {
                try {
                    this.product = await ProductService.view(id);
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
            async createProductSize(data) {
                try {
                    await ProductService.createSize(data)
                    .then(async (response) => {
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
    
                        if(response == true) {
                            Toast.fire({
                                icon: 'success',
                                title: "Size được thêm thành công!"
                            })
                        }
                        if(response == false) {
                            Toast.fire({
                                icon: 'warning',
                                title: "Size đã tồn tại!"
                            })
                        }

                    });
                    

                } catch (error) {
                    console.log(error);
                }
            },
            async createProductImage(data) {
                try {
                    await ProductService.createImage(data);
                    
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
                        title: 'Hình ảnh được thêm thành công.'
                    })

                    this.getProduct(this.id);
                    
                    
                } catch (error) {
                    console.log(error);
                }
            },
        },
        watch: {
            product: {
            handler: function(newVal, oldVal) {
                this.product = Object.assign({}, newVal);
            },
            deep: true
            }
        },
        created() {
            this.getProduct(this.id);
        },
    };
</script>
<style>
    .box-body {
        padding: 30px;
    }
</style>