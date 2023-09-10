<template>
    <section class="product-list mt-5 filter_products mb-5">
      <p v-if="keyword" class="text-center">Kết quả tìm kiếm cho từ khóa "{{ keyword }}"</p>
      <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts" />
      <p class="mt-100 text-center" v-else>Không có sản phẩm nào.</p>
    </section>
  </template>
  
  <script>
  import ProductList from "@/components/user/products/ProductList.vue";
  import ProductService from "@/services/admin/product.service";
  import Fuse from 'fuse.js';
  
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
        fuse: null,
      };
    },
    computed: {
      filteredProducts() {
        if (!this.keyword) return this.products;
        if (!this.fuse) return this.products;
  
        return this.fuse.search(this.keyword).map(result => result.item);
      },
      filteredProductsCount() {
        return this.filteredProducts.length;
      },
    },
    methods: {
      async getProductAll() {
        try {
          this.products = await ProductService.getProducts();
          this.initializeFuse(); // Initialize Fuse after fetching products
        } catch (error) {
          console.log(error);
          // Handle error as needed
        }
      },
      initializeFuse() {
        const options = {
          keys: ['name', 'description'], // Add your relevant fields for searching
          threshold: 0.3, // Adjust the threshold as needed
        };
        this.fuse = new Fuse(this.products, options);
      },
    },
    created() {
      this.getProductAll();
    },
  };
  </script>
  