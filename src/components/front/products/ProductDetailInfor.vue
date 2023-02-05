<template>
    <div class="detail-info">
        <div class="info-name">
            <h3>{{ product.name }}</h3>
        </div>
        <div class="info-category">
            <p>{{ product.category.name }}</p>
        </div>
        <div class="info-price">
            <p>{{ product.price }}</p>
        </div>
        <hr>
        <div class="info-des">
            <p>{{ product.description }}</p>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            product: { type: Object, required: true },
        },
    };
</script>

