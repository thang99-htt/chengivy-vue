<template>
    <section class="section mt-50">
        <div v-if="product">
            <ProductDetailItem
                :product="product"
                @submit:product="createCart"
            />  
        </div>
    </section>
</template>
<script>
    import ProductDetailItem from "@/components/front/products/ProductDetailItem.vue";
    import ProductService from "@/services/front/product.service";
    export default {
        components: {
            ProductDetailItem,
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
                    this.product = await ProductService.getDetail(id);
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
            async createCart(data) {
                try {
                    await RoleService.create(data);
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
                        title: 'Sản phẩm đã được thêm vào giỏ hàng.'
                    })
                } catch (error) {
                    console.log(error);
                }
            },
        },
        created() {
            this.getProduct(this.id);
        },
    };
</script>
