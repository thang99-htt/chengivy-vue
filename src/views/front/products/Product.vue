<template>
    <section class="content">
        <div v-if="product">
            <ProductList
                :product="product"
            />  
        </div>
    </section>
</template>
<script>
    import ProductList from "@/components/front/products/ProductList.vue";
    import ProductService from "@/services/front/product.service";
    export default {
        components: {
            ProductList,
        },
        props: {
            url: { type: String, required: true },
        },
        data() {
            return {
                product: null,
            };
        },
        methods: {
            async getProduct(url) {
                try {
                    this.product = await ProductService.getListing(url);
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
        },
        created() {
            this.getProduct(this.url);
        },
    };
</script>
