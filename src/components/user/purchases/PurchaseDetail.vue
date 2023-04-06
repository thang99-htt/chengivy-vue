<template>
    <div class="accordion mt-3">
        <div
            class="accordion-item"
            v-for="(product, index) in orderLocal"
            :key="product.id"
        >
            <div class="accordion-content">
                <div class="row">
                    <div class="col-8">
                        <div class="d-flex">
                            <img class="d-block me-3" width="100" :src="getImage(product.product_image)" alt="">
                            <div>
                                <router-link 
                                    :to="{
                                        name: 'product.detail',
                                        params: { id: product.product_id },
                                    }" 
                                    class="text-dark"
                                >
                                    {{ product.product_name }}
                                </router-link>
                                <p>Size: {{ product.product_size }}</p>
                                <p>x{{ product.product_quantity }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 accordion-price">
                        <p class="fs-6">{{ formatPrice(product.product_price) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {        
        props: {
            order: { type: Object, required: true },
            purchasesList: { type: Object, required: true },
        },
        
        data() {
            return {
                orderLocal: this.order.order_details,
            };
        },
        methods: {
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
        }
    };
</script>

<style>
    .accordion-item {
        background-color: #fffdfd;
        box-shadow: 0 0 10px #00000012;
        padding: 20px;
        margin-bottom: 20px;
    }

    .accordion-item img {
        border-radius: 4px;
    }

    .accordion-price {
        display: flex;
        align-items: center;
        justify-content: end;
    }
</style>
