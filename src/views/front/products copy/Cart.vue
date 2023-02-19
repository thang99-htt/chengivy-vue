<template>
    <section class="content">
        <div v-if="cart">
            <CartList
                :cart="cart"
            />  
        </div>
    </section>
</template>
<script>
    import CartList from "@/components/front/carts/CartList.vue";
    import CartService from "@/services/front/cart.service";
    export default {
        components: {
            CartList,
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
                    this.product = await CartService.getListing(url);
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
