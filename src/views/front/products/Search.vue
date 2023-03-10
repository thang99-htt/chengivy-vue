<template>
    <div class="container-fluid mt-100">
        <InputSearch v-model="searchText" />
        <section 
            class="product-list filter_products"
            v-if="searchText"
        >
            <ProductList
                v-if="filteredProductsCount > 0"
                :products="filteredProducts"
            />  
            <p class="mt-100 text-center" v-else>Không tìm thấy sản phẩm cần tìm.</p>
        </section>
    </div>
</template>

<script>
    import InputSearch from "@/components/front/products/InputSearch.vue";
    import ProductService from "@/services/front/product.service";
    import ProductList from "@/components/front/products/ProductList.vue";
    export default {
        components: {
            InputSearch,
            ProductList,
        },
        data() {
            return {
                searchText: "",
                products: [],
            };
        },
        computed: {
            filteredProducts() {
                if (!this.searchText) return this.products;
                return this.products.filter(item => item.name.toLowerCase()
                    .includes(this.searchText.toLowerCase()));
            },
            filteredProductsCount() {
            return this.filteredProducts.length;
        },
        },
        methods: {
            async getProduct() {
                try {
                    this.products = await ProductService.getListingAll();
                } catch (error) {
                    console.log(error);
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
            this.getProduct();
        },
    }
</script>

<style>
    .form button {
        border: none;
        background: none;
        color: #8b8ba7;
    }

    .form {
        --timing: 0.3s;
        --width-of-input: 200px;
        --height-of-input: 40px;
        --border-height: 2px;
        --input-bg: #fff;
        --border-color: #2f2ee9;
        --border-radius: 30px;
        --after-border-radius: 1px;
        position: relative;
        margin: auto;
        width: 50%;
        height: 50px;
        display: flex;
        align-items: center;
        padding-inline: 0.8em;
        border-radius: var(--border-radius);
        transition: border-radius 0.5s ease;
        background: #f4f4f4;
    }
    .input {
        font-size: 0.9rem;
        background-color: transparent;
        width: 100%;
        height: 100%;
        padding-inline: 0.5em;
        padding-block: 0.7em;
        border: none;
    }
    .form:before {
        content: "";
        position: absolute;
        background: var(--border-color);
        transform: scaleX(0);
        transform-origin: center;
        width: 100%;
        height: var(--border-height);
        left: 0;
        bottom: 0;
        border-radius: 1px;
        transition: transform var(--timing) ease;
    }
    .form:focus-within {
        border-radius: var(--after-border-radius);
    }
    input:focus {
        outline: none;
    }
    .form:focus-within:before {
        transform: scale(1);
    }
    .reset {
        border: none;
        background: none;
        opacity: 0;
        visibility: hidden;
    }
    input:not(:placeholder-shown) ~ .reset {
        opacity: 1;
        visibility: visible;
    }
    .form svg {
        width: 17px;
        margin-top: 3px;
    }
</style>