<template>
    <section class="product-list mt-5 filter_products mb-5">
        <p v-if="this.keyword" class="text-center">Kết quả tìm kiếm cho từ khóa "{{ this.keyword }}"</p>
        <ProductList
            v-if="filteredProductsCount > 0"
            :products="filteredProducts"
        />  
        <!-- <p class="mt-100 text-center" v-else>Không có sản phẩm nào.</p> -->
    </section>
</template>
<script>
    import ProductList from "@/components/user/products/ProductList.vue";
    import ProductService from "@/services/admin/product.service";
    export default {
        components: {
            ProductList,
        },
        props: {
            url: { type: String, required: true },
        },
        watch: {
            $route(to, from) {
                const keyword = to.query.keyword || '';

                if (keyword !== this.keyword) {
                    this.keyword = keyword;
                }
            },      
        },  
        data() {
            return {
                products: [],
                itemsPerPage: 5,
                keyword: this.$route.query.keyword,
            };
        },
        computed: {
            filteredProducts() {
                if (!this.keyword) return this.products;
                return this.products.filter(item => item.name.toLowerCase()
                    .includes(this.keyword.toLowerCase()));
            },
            filteredProductsCount() {
                return this.filteredProducts.length;
            },
        },
        methods: {
            async getProductAll() {
                try {
                    this.products = await ProductService.getProducts();
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
            this.getProductAll();
        },
    };
</script>
