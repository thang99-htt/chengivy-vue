<template>
    <div class="container mt-5">
        <div class="row">
            <img class="img-checkout" src="images/checkout/checkout-success-page.png" alt="">
            <p class="track-checkout text-center">
                <router-link :to="{ name: 'purchase' }" class="main-btn">
                    Theo dõi đơn hàng của bạn tại đây.
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>


<style>
    .img-checkout {
        width: 600px;
        display: block;
        margin: 0 auto 14px auto ;
    }
    .track-checkout a {
        color: #180054;
        font-weight: 700;
        text-decoration: underline;
    }
</style>