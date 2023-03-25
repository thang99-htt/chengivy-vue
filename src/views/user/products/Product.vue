<template>
    <section class="product-list section filter_products mb-5">
        <ProductList
            v-if="filteredProductsCount > 0"
            :products="filteredProducts"
        />  
        <p class="mt-100 text-center" v-else>Không có sản phẩm nào.</p>
    </section>
</template>
<script>
    import ProductList from "@/components/user/products/ProductList.vue";
    import ProductService from "@/services/user/product.service";
    export default {
        components: {
            ProductList,
        },
        props: {
            url: { type: String, required: true },
        },
        data() {
            return {
                products: [],
                itemsPerPage: 5,
            };
        },
        computed: {
            filteredProducts() {
                return this.products;
            },
            filteredProductsCount() {
                return this.filteredProducts.length;
            },
        },
        methods: {
            async getProduct(url) {
                try {
                    this.products = await ProductService.getListing(url);
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
            async getProductAll() {
                try {
                    this.products = await ProductService.getListingAll();
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
            if(this.url) {
                this.getProduct(this.url);
            }
            else this.getProductAll();
        },
    };
</script>
