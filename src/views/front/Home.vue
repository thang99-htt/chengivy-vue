<script>
    import ProductTrending from "@/components/front/products/ProductTrending.vue";
    import ProductSpecial from "@/components/front/products/ProductSpecial.vue";

    export default {
        components: {
            ProductTrending,
            ProductSpecial
        },
        data() {
            return {
                products: [],
            };
        },
        computed: {
            filteredProducts() {
                return this.products;
            },
        },
    };
</script>
<template>
  <section class="hero-area">
      <img src="images/hero/hero1.jpg" alt="">
  </section>

  <section class="trending-product section">
    <ProductTrending
        :products="filteredProducts"
    />
  </section>

  <section class="special-offer section">
    <ProductSpecial
        :products="filteredProducts"
    />
  </section>

</template>
<style scoped>

</style>
